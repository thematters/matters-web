import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React from 'react'

import { Dialog, Translate } from '~/components'

import CardSection from './CardSection'

export interface CheckoutFormProps {
  client_secret: string
  amount: number
  currency: string
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({
  client_secret,
  amount,
  currency,
}) => {
  const stripe = useStripe()
  const elements = useElements()
  const formId = 'checkout-form'

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault()

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return
    }

    const result = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: 'Jenny Rosen',
        },
      },
    })

    if (result.error) {
      // Show error to your customer (e.g., insufficient funds)
      console.log(result.error.message)
    } else {
      // The payment has been processed!
      if (result.paymentIntent.status === 'succeeded') {
        // Show a success message to your customer
        // There's a risk of the customer closing the window before callback
        // execution. Set up a webhook or plugin to listen for the
        // payment_intent.succeeded event that handles any business critical
        // post-payment actions.
      }
    }
  }

  return (
    <>
      <Dialog.Content hasGrow>
        <form id={formId} onSubmit={handleSubmit}>
          <CardSection />
        </form>
      </Dialog.Content>

      <Dialog.Footer>
        <Dialog.Footer.Button
          type="submit"
          form={formId}
          disabled={!stripe}
          bgColor="green"
          textColor="white"
          // loading={isSubmitting}
        >
          <Translate id="pay" /> {currency} {amount}
        </Dialog.Footer.Button>
      </Dialog.Footer>
    </>
  )
}

export default CheckoutForm
