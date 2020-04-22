import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import _get from 'lodash/get'
import React, { useContext, useState } from 'react'

import { Dialog, Translate } from '~/components'
import { LanguageContext } from '~/components/Context'

import { STRIPE_ERROR_MESSAGES } from '~/common/enums'
import { toAmountString } from '~/common/utils'

import CardSection from './CardSection'

export interface CheckoutFormProps {
  client_secret: string
  amount?: number
  currency?: string
  submitCallback: () => void
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({
  client_secret,
  amount,
  currency,
  submitCallback,
}) => {
  const stripe = useStripe()
  const elements = useElements()
  const { lang } = useContext(LanguageContext)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | React.ReactNode>('')
  const formId = 'checkout-form'

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setSubmitting(true)

    if (!stripe || !elements) {
      return
    }

    const cardElement = elements.getElement(CardElement)

    const result = await stripe.confirmCardPayment(client_secret, {
      // @ts-ignore
      payment_method: { card: cardElement },
    })

    if (result.error) {
      const msg =
        lang === 'en'
          ? undefined
          : _get(STRIPE_ERROR_MESSAGES[lang], result.error.code)

      setError(msg || result.error.message)

      import('@sentry/browser').then((Sentry) => {
        Sentry.captureException(result.error)
      })
    } else {
      if (result.paymentIntent.status === 'succeeded') {
        submitCallback()
      }
    }

    setSubmitting(false)
  }

  return (
    <>
      <Dialog.Content hasGrow>
        <form id={formId} onSubmit={handleSubmit}>
          <CardSection error={error} />
        </form>
      </Dialog.Content>

      <Dialog.Footer>
        <Dialog.Footer.Button
          type="submit"
          form={formId}
          disabled={!stripe}
          bgColor="green"
          textColor="white"
          loading={submitting}
        >
          <Translate id="pay" /> {currency}{' '}
          {amount ? toAmountString(amount) : ''}
        </Dialog.Footer.Button>
      </Dialog.Footer>
    </>
  )
}

export default CheckoutForm
