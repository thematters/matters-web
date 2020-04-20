import { Dialog, Head, Layout, Spacer, Translate } from '~/components'

import Balance from './Balance'

const Wallet = () => {
  return (
    <Layout.Main>
      <Layout.Header
        left={<Layout.Header.BackButton />}
        right={<Layout.Header.Title id="myWallet" />}
      />

      <Head title={{ id: 'myWallet' }} />

      <Spacer size="xxloose" />

      <Balance />

      <Dialog.Footer>
        <Dialog.Footer.Button bgColor="green">
          <Translate id="topUp" />
        </Dialog.Footer.Button>

        <Dialog.Footer.Button bgColor="grey-lighter" textColor="black">
          <Translate id="paymentPassword" />
        </Dialog.Footer.Button>
      </Dialog.Footer>
    </Layout.Main>
  )
}
export default Wallet
