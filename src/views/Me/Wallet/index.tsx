import { useQuery } from '@apollo/react-hooks'
import { useContext } from 'react'

import {
  Form,
  Head,
  Layout,
  PullToRefresh,
  Spacer,
  Spinner,
  Translate,
  ViewerContext,
} from '~/components'
import WALLET_BALANCE from '~/components/GQL/queries/walletBalance'

import { PATHS, PAYMENT_MINIMAL_PAYOUT_AMOUNT } from '~/common/enums'

import Balance from './Balance'
import Buttons from './Buttons'
import PaymentPassword from './PaymentPassword'
import ViewStripeAccount from './ViewStripeAccount'

import { WalletBalance } from '~/components/GQL/queries/__generated__/WalletBalance'

const Wallet = () => {
  const viewer = useContext(ViewerContext)

  const { data, loading, refetch } = useQuery<WalletBalance>(WALLET_BALANCE, {
    fetchPolicy: 'no-cache',
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
    <Layout.Main>
      <Layout.Header
        left={<Layout.Header.BackButton />}
        right={<Layout.Header.Title id="myWallet" />}
      />

      <Head title={{ id: 'myWallet' }} />

      <PullToRefresh refresh={refetch}>
        <Spacer size="xxloose" />

        <Balance balanceHKD={balanceHKD} canPayout={canPayout} />

        <Buttons canPayout={canPayout} hasStripeAccount={hasStripeAccount} />

        <Form.List>
          <Form.List.Item
            title={<Translate id="paymentTransactions" />}
            href={PATHS.ME_WALLET_TRANSACTIONS}
          />
          {hasPaymentPassword && <PaymentPassword />}
          {hasStripeAccount && <ViewStripeAccount />}
        </Form.List>
      </PullToRefresh>
    </Layout.Main>
  )
}
export default Wallet
