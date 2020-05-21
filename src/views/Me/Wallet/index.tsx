import { useQuery } from '@apollo/react-hooks'

import {
  Form,
  Head,
  Layout,
  PullToRefresh,
  Spacer,
  Spinner,
  Translate,
} from '~/components'
import WALLET_BALANCE from '~/components/GQL/queries/walletBalance'

import { PAYMENT_MINIMAL_PAYOUT_AMOUNT, PATHS } from '~/common/enums'

import Balance from './Balance'
import Buttons from './Buttons'
import ViewStripeAccount from './ViewStripeAccount'

import { WalletBalance } from '~/components/GQL/queries/__generated__/WalletBalance'

const Wallet = () => {
  const { data, loading, refetch } = useQuery<WalletBalance>(WALLET_BALANCE)
  const balanceHKD = data?.viewer?.wallet.balance.HKD || 0
  const canPayout = balanceHKD >= PAYMENT_MINIMAL_PAYOUT_AMOUNT.HKD
  const hasStripeAccount = !!data?.viewer?.wallet.stripeAccount?.id

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

          {hasStripeAccount && <ViewStripeAccount />}
        </Form.List>
      </PullToRefresh>
    </Layout.Main>
  )
}
export default Wallet
