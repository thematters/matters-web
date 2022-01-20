import { Head, Layout, useRoute, useStep, WalletAuthForm } from '~/components'

import { PATHS } from '~/common/enums'

type Step = 'wallet-select' | 'wallet-connect'

const ConnectWallet = () => {
  const { router } = useRoute()

  const initStep = 'wallet-select'
  const { currStep, forward } = useStep<Step>(initStep)

  return (
    <Layout.Main bgColor="grey-lighter">
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
          submitCallback={() => router.push(PATHS.ME_SETTINGS)}
          back={() => forward('wallet-select')}
        />
      )}
    </Layout.Main>
  )
}

export default ConnectWallet
