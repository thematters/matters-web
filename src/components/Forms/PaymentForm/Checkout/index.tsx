import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import getConfig from 'next/config'

import CheckoutForm, { CheckoutFormProps } from './CheckoutForm'

const {
  publicRuntimeConfig: { STRIPE_PUBLIC_KEY },
} = getConfig()

type CheckoutProps = CheckoutFormProps

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(STRIPE_PUBLIC_KEY)

const Checkout: React.FC<CheckoutProps> = (props) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm {...props} />
    </Elements>
  )
}

export default Checkout
