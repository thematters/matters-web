import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import getConfig from 'next/config'
import { useContext } from 'react'

import { LanguageContext } from '~/components/Context'

import CheckoutForm, { CheckoutFormProps } from './CheckoutForm'

const {
  publicRuntimeConfig: { STRIPE_PUBLIC_KEY },
} = getConfig()

type CheckoutProps = CheckoutFormProps

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(STRIPE_PUBLIC_KEY)

const Checkout: React.FC<CheckoutProps> = (props) => {
  const { lang } = useContext(LanguageContext)

  return (
    <Elements
      stripe={stripePromise}
      options={{ locale: lang === 'zh_hans' ? 'zh' : 'en' }}
    >
      <CheckoutForm {...props} />
    </Elements>
  )
}

export default Checkout
