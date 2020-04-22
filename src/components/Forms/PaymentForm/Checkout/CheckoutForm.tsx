import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React, { useState } from 'react'

import { Dialog, Translate } from '~/components'

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

    if (!cardElement) {
      setError(<Translate id="ACTION_FAILED" />)
    }

    const result = await stripe.confirmCardPayment(client_secret, {
      payment_method: { card: cardElement },
    })

    if (result.error) {
      console.log(result.error)
      setError(result.error.code)

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
          <Translate id="pay" /> {currency} {amount}
        </Dialog.Footer.Button>
      </Dialog.Footer>
    </>
  )
}

export default CheckoutForm
