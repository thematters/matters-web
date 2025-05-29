import { ApolloError } from '@apollo/client'
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js'
import { loadStripe, StripeCardElementChangeEvent } from '@stripe/stripe-js'
import _get from 'lodash/get'
import { useContext, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import { STRIPE_ERROR_MESSAGES } from '~/common/enums'
import { analytics, parseFormSubmitErrors } from '~/common/utils'
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
  UserLanguage,
} from '~/gql/graphql'

import StripeCheckout from '../StripeCheckout'
import { SUBSCRIBE_CIRCLE } from './gql'
import ContentHead from './Head'
import Hint from './Hint'
import Processing from './Processing'

interface CardPaymentProps {
  circle: DigestRichCirclePublicFragment & DigestRichCirclePrivateFragment
  submitCallback: () => void
  closeDialog: () => void
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
  closeDialog,
}) => {
  const intl = useIntl()
  const { lang } = useContext(LanguageContext)

  const stripe = useStripe()
  const elements = useElements()

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
      setCheckoutError(
        intl.formatMessage({ defaultMessage: 'Required', id: 'Seanpx' })
      )
    } else {
      setCheckoutError('')
    }
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    analytics.trackEvent('click_button', { type: 'subscribe_confirm' })

    let data: SubscribeCircleMutation | null | undefined

    try {
      const subscribeResult = await subscribeCircle({
        variables: { input: { id: circle.id } },
      })
      data = subscribeResult.data
    } catch (error) {
      const [messages, codes] = parseFormSubmitErrors(error as ApolloError)
      codes.forEach((code) => {
        setCheckoutError(intl.formatMessage(messages[code]))
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
      <Dialog.Header
        closeDialog={closeDialog}
        title={
          <FormattedMessage defaultMessage="Subscribe Circle" id="hG2cBH" />
        }
      />

      <Dialog.Content fixedHeight>
        <ContentHead circle={circle} />

        <StripeCheckout error={checkoutError} onChange={onCheckoutChange} />

        <Hint />
      </Dialog.Content>

      <Dialog.Footer
        btns={
          <Dialog.RoundedButton
            text={
              <Translate zh_hant="確認訂閱" zh_hans="确认订阅" en="Confirm" />
            }
            disabled={disabled || isSubmitting || !!checkoutError}
            loading={isSubmitting}
            onClick={handleSubmit}
          />
        }
        smUpBtns={
          <>
            <Dialog.TextButton
              color="greyDarker"
              text={<FormattedMessage defaultMessage="Cancel" id="47FYwb" />}
              onClick={closeDialog}
            />
            <Dialog.TextButton
              text={
                <Translate zh_hant="確認訂閱" zh_hans="确认订阅" en="Confirm" />
              }
              disabled={disabled || isSubmitting || !!checkoutError}
              loading={isSubmitting}
              onClick={handleSubmit}
            />
          </>
        }
      />
    </>
  )
}

const CardPayment: React.FC<CardPaymentProps> = (props) => {
  const { lang } = useContext(LanguageContext)

  return (
    <Elements
      stripe={stripePromise}
      options={{ locale: lang === UserLanguage.ZhHans ? 'zh' : 'en' }}
    >
      <BaseCardPayment {...props} />
    </Elements>
  )
}

export default CardPayment
