import { useQuery } from '@apollo/react-hooks'
import { useContext } from 'react'

import {
  Form,
  Head,
  Layout,
  PullToRefresh,
  Spacer,
  Spinner,
  ViewerContext,
} from '~/components'
import WALLET_BALANCE from '~/components/GQL/queries/walletBalance'

import { PAYMENT_MINIMAL_PAYOUT_AMOUNT } from '~/common/enums'

import { FiatCurrency, LikeCoin } from './Balance'
import PaymentPassword from './PaymentPassword'
import PaymentPointer from './PaymentPointer'
import TotalAssets from './TotalAssets'
import ViewStripeAccount from './ViewStripeAccount'
import ViewStripeCustomerPortal from './ViewStripeCustomerPortal'

import { WalletBalance } from '~/components/GQL/queries/__generated__/WalletBalance'

const Wallet = () => {
  const viewer = useContext(ViewerContext)

  const { data, loading, refetch } = useQuery<WalletBalance>(WALLET_BALANCE, {
    fetchPolicy: 'network-only',
  })
  const balanceHKD = data?.viewer?.wallet.balance.HKD || 0
  const canPayout = balanceHKD >= PAYMENT_MINIMAL_PAYOUT_AMOUNT.HKD
  const hasStripeAccount = !!data?.viewer?.wallet.stripeAccount?.id
  const hasPaymentPassword = viewer.status?.hasPaymentPassword

  if (loading) {
    return (
      <Layout.Main>
        <Layout.Header
          left={<Layout.Header.BackButton />}
          right={<Layout.Header.Title id="myWallet" />}
        />
        <Spinner />
      </Layout.Main>
    )
  }

  return (
    <Layout.Main bgColor="grey-lighter">
      <Layout.Header
        left={<Layout.Header.BackButton />}
        right={<Layout.Header.Title id="myWallet" />}
      />

      <Head title={{ id: 'myWallet' }} />

      <PullToRefresh refresh={refetch}>
        <Spacer size="xxloose" />

        <Form.List>
          <TotalAssets />
          <FiatCurrency
            balanceHKD={balanceHKD}
            canPayout={canPayout}
            hasStripeAccount={hasStripeAccount}
          />
          <LikeCoin />
          {hasPaymentPassword && <PaymentPassword />}
          <ViewStripeCustomerPortal />
          {hasStripeAccount && <ViewStripeAccount />}
          <PaymentPointer />
        </Form.List>
      </PullToRefresh>
    </Layout.Main>
  )
}
export default Wallet
