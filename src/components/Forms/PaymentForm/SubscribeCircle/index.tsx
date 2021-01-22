import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js'
import { loadStripe, StripeCardElementChangeEvent } from '@stripe/stripe-js'
import _get from 'lodash/get'
import _pickBy from 'lodash/pickBy'
import { useContext, useState } from 'react'

import { CircleDigest, Dialog, LanguageContext, Translate } from '~/components'
import { useMutation } from '~/components/GQL'

import { STRIPE_ERROR_MESSAGES } from '~/common/enums'
import {
  analytics,
  parseFormSubmitErrors,
  toAmountString,
  translate,
} from '~/common/utils'

import ConfirmTable from '../ConfirmTable'
import StripeCheckout from '../StripeCheckout'
import { SUBSCRIBE_CIRCLE } from './gql'
import Hint from './Hint'
import styles from './styles.css'

import { DigestRichCirclePublic } from '~/components/CircleDigest/Rich/__generated__/DigestRichCirclePublic'
import { SubscribeCircle as SubscribeCircleType } from './__generated__/SubscribeCircle'

interface FormProps {
  circle: DigestRichCirclePublic
  submitCallback: () => void
}

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || ''
)

const BaseSubscribeCircle: React.FC<FormProps> = ({
  circle,
  submitCallback,
}) => {
  const stripe = useStripe()
  const elements = useElements()
  const { lang } = useContext(LanguageContext)
  const [subscribeCircle] = useMutation<SubscribeCircleType>(SUBSCRIBE_CIRCLE)

  const [isSubmitting, setSubmitting] = useState(false)
  const [checkoutError, setCheckoutError] = useState('')
  const onCheckoutChange = (event: StripeCardElementChangeEvent) => {
    if (event.error) {
      const msg =
        lang === 'en'
          ? undefined
          : _get(STRIPE_ERROR_MESSAGES[lang], event.error.code)

      setCheckoutError(msg || event.error.message)
    } else if (event.empty) {
      setCheckoutError(translate({ lang, id: 'required' }))
    } else {
      setCheckoutError('')
    }
  }

  const handleSubmit = async () => {
    /**
     * Create Transaction
     */
    let data: SubscribeCircleType | undefined

    try {
      const txResult = await subscribeCircle({
        variables: { input: { id: circle.id } },
      })
      data = txResult.data
    } catch (error) {
      const [messages, codes] = parseFormSubmitErrors(error, lang)
      codes.forEach((code) => {
        setCheckoutError(messages[code])
      })
    }

    /**
     * Checkout
     */
    const client_secret = data?.subscribeCircle.client_secret

    if (!stripe || !elements || !client_secret) {
      return
    }

    const cardElement = elements.getElement(CardElement)

    if (!cardElement) {
      return
    }

    const result = await stripe.confirmCardPayment(client_secret, {
      payment_method: { card: cardElement },
    })

    if (result.error) {
      const msg =
        lang === 'en'
          ? undefined
          : _get(STRIPE_ERROR_MESSAGES[lang], result.error.code || '')

      setCheckoutError(msg || result.error.message)

      analytics.trackEvent('subscribe', {
        id: circle.id,
        success: false,
        message: JSON.stringify(result.error),
      })

      import('@sentry/browser').then((Sentry) => {
        Sentry.captureException(result.error)
      })
    } else {
      if (result.paymentIntent?.status === 'succeeded') {
        analytics.trackEvent('subscribe', { id: circle.id, success: true })
      }

      submitCallback()
    }

    setSubmitting(false)
  }

  const price = circle.prices && circle.prices[0]

  return (
    <>
      <Dialog.Content hasGrow>
        <section>
          <section className="circle">
            <CircleDigest.Rich
              circle={circle}
              borderRadius="xtight"
              bgColor="white"
              hasFooter={false}
              hasDescription
              hasOwner
              disabled
            />
          </section>

          {price && (
            <ConfirmTable>
              <ConfirmTable.Row type="balance">
                <ConfirmTable.Col>
                  <Translate zh_hant="每月費用" zh_hans="每月费用" />
                </ConfirmTable.Col>

                <ConfirmTable.Col>
                  {price.currency} {toAmountString(price.amount)}
                </ConfirmTable.Col>
              </ConfirmTable.Row>
            </ConfirmTable>
          )}

          <StripeCheckout error={checkoutError} onChange={onCheckoutChange} />

          <Hint />
        </section>
      </Dialog.Content>

      <Dialog.Footer>
        <Dialog.Footer.Button
          onClick={handleSubmit}
          disabled={isSubmitting || !!checkoutError}
          loading={isSubmitting}
        >
          <Translate zh_hant="確認訂閱" zh_hans="确认订阅" />
        </Dialog.Footer.Button>
      </Dialog.Footer>

      <style jsx>{styles}</style>
    </>
  )
}

const SubscribeCircle: React.FC<FormProps> = (props) => {
  const { lang } = useContext(LanguageContext)

  return (
    <Elements
      stripe={stripePromise}
      options={{ locale: lang === 'zh_hans' ? 'zh' : 'en' }}
    >
      <BaseSubscribeCircle {...props} />
    </Elements>
  )
}

export default SubscribeCircle
