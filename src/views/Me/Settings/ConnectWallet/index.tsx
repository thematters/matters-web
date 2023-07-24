import { useContext } from 'react'

import { PATHS } from '~/common/enums'
import {
  EmptyWarning,
  Head,
  Layout,
  Translate,
  useStep,
  ViewerContext,
  WalletAuthForm,
} from '~/components'

type Step = 'wallet-select' | 'wallet-connect'

const ConnectWallet = () => {
  const viewer = useContext(ViewerContext)
  const viewerEthAddress = viewer.info.ethAddress

  const initStep = 'wallet-select'
  const { currStep, forward } = useStep<Step>(initStep)

  if (viewerEthAddress) {
    return (
      <Layout.Main>
        <Head title={{ id: 'loginWithWallet' }} />

        <Layout.Header left={<Layout.Header.Title id="loginWithWallet" />} />

        <EmptyWarning
          description={
            <Translate
              zh_hant="你已綁定錢包"
              zh_hans="你已绑定钱包"
              en="You have connected a wallet."
            />
          }
        />
      </Layout.Main>
    )
  }

  return (
    <Layout.Main>
      <Head title={{ id: 'loginWithWallet' }} />

      {currStep === 'wallet-select' && (
        <WalletAuthForm.Select
          purpose="page"
          type="connect"
          submitCallback={() => {
            forward('wallet-connect')
          }}
        />
      )}
      {currStep === 'wallet-connect' && (
        <WalletAuthForm.Connect
          purpose="page"
          submitCallback={() => (window.location.href = PATHS.ME_SETTINGS)}
          back={() => forward('wallet-select')}
        />
      )}
    </Layout.Main>
  )
}

export default ConnectWallet
