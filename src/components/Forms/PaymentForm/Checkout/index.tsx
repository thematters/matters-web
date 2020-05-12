import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { useContext } from 'react'

import { LanguageContext } from '~/components/Context'

import CheckoutForm, { CheckoutFormProps } from './CheckoutForm'

type CheckoutProps = CheckoutFormProps

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || ''
)

const Checkout: React.FC<CheckoutProps> = (props) => {
  const { lang } = useContext(LanguageContext)

  return (
    <Elements
      stripe={stripePromise}
      options={{ locale: lang === 'en' ? 'en' : 'zh' }}
    >
      <CheckoutForm {...props} />
    </Elements>
  )
}

export default Checkout
