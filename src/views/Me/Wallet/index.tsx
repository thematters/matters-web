import {
  Form,
  Head,
  Layout,
  PullToRefresh,
  Spacer,
  Translate,
} from '~/components'

import { PATHS } from '~/common/enums'

import Balance from './Balance'
import Buttons from './Buttons'

const Wallet = () => {
  return (
    <Layout.Main>
      <Layout.Header
        left={<Layout.Header.BackButton />}
        right={<Layout.Header.Title id="myWallet" />}
      />

      <Head title={{ id: 'myWallet' }} />

      <PullToRefresh>
        <Spacer size="xxloose" />

        <Balance />

        <Buttons />

        <Form.List>
          <Form.List.Item
            title={<Translate id="paymentTransactions" />}
            href={PATHS.ME_WALLET_TRANSACTIONS}
          />
        </Form.List>
      </PullToRefresh>
    </Layout.Main>
  )
}
export default Wallet
