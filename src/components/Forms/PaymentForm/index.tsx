import dynamic from 'next/dynamic'

import { Spinner } from '~/components'

import ConnectStripeAccount from './ConnectStripeAccount'
import Payout from './Payout'
import PayTo from './PayTo'
import Processing from './Processing'
import ResetPassword from './ResetPassword'
import SetPassword from './SetPassword'

const DynamicAddCredit = dynamic(() => import('./AddCredit'), {
  ssr: false,
  loading: Spinner,
})

export const PaymentForm = {
  AddCredit: DynamicAddCredit,
  ConnectStripeAccount,
  Payout,
  PayTo,
  Processing,
  ResetPassword,
  SetPassword,
}
