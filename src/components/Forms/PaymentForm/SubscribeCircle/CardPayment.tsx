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

import { STRIPE_ERROR_MESSAGES } from '~/common/enums'
import { analytics, parseFormSubmitErrors, translate } from '~/common/utils'
import {
  Dialog,
  LanguageContext,
  Translate,
  useMutation,
  useStep,
} from '~/components'
import {
  DigestRichCirclePrivateFragment,
  DigestRichCirclePublicFragment,
  SubscribeCircleMutation,
} from '~/gql/graphql'

import StripeCheckout from '../StripeCheckout'
import { SUBSCRIBE_CIRCLE } from './gql'
import Head from './Head'
import Hint from './Hint'
import Processing from './Processing'

interface CardPaymentProps {
  circle: DigestRichCirclePublicFragment & DigestRichCirclePrivateFragment
  submitCallback: () => void
}

type Step = 'confirmation' | 'processing'

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || ''
)

const BaseCardPayment: React.FC<CardPaymentProps> = ({
  circle,
  submitCallback,
}) => {
  const stripe = useStripe()
  const elements = useElements()
  const { lang } = useContext(LanguageContext)

  const [subscribeCircle] = useMutation<SubscribeCircleMutation>(
    SUBSCRIBE_CIRCLE,
    undefined,
    { showToast: false }
  )

  const [disabled, setDisabled] = useState(true)
  const [isSubmitting, setSubmitting] = useState(false)
  const [checkoutError, setCheckoutError] = useState('')

  const { currStep, forward } = useStep<Step>('confirmation')
  const isProcessing = currStep === 'processing'

  const onCheckoutChange = (event: StripeCardElementChangeEvent) => {
    setDisabled(!event.complete)

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
    setSubmitting(true)
    analytics.trackEvent('click_button', { type: 'subscribe_confirm' })

    let data: SubscribeCircleMutation | undefined

    try {
      const subscribeResult = await subscribeCircle({
        variables: { input: { id: circle.id } },
      })
      data = subscribeResult.data
    } catch (error) {
      const [messages, codes] = parseFormSubmitErrors(error as any, lang)
      codes.forEach((code) => {
        setCheckoutError(messages[code])
      })
    }

    const client_secret = data?.subscribeCircle.client_secret

    if (!stripe || !elements || !client_secret) {
      setSubmitting(false)
      return
    }

    const cardElement = elements.getElement(CardElement)

    if (!cardElement) {
      setSubmitting(false)
      return
    }

    const result = await stripe.confirmCardSetup(client_secret, {
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
      if (result.setupIntent?.status === 'succeeded') {
        analytics.trackEvent('subscribe', { id: circle.id, success: true })
      }

      forward('processing')
    }

    setSubmitting(false)
  }

  if (isProcessing) {
    return <Processing circleName={circle.name} nextStep={submitCallback} />
  }

  return (
    <>
      <Dialog.Content hasGrow>
        <section>
          <Head circle={circle} />

          <StripeCheckout error={checkoutError} onChange={onCheckoutChange} />

          <Hint />
        </section>
      </Dialog.Content>

      <Dialog.Footer>
        <Dialog.Footer.Button
          onClick={handleSubmit}
          disabled={disabled || isSubmitting || !!checkoutError}
          loading={isSubmitting}
        >
          <Translate zh_hant="確認訂閱" zh_hans="确认订阅" en="Confirm" />
        </Dialog.Footer.Button>
      </Dialog.Footer>
    </>
  )
}

const CardPayment: React.FC<CardPaymentProps> = (props) => {
  const { lang } = useContext(LanguageContext)

  return (
    <Elements
      stripe={stripePromise}
      options={{ locale: lang === 'zh_hans' ? 'zh' : 'en' }}
    >
      <BaseCardPayment {...props} />
    </Elements>
  )
}

export default CardPayment
