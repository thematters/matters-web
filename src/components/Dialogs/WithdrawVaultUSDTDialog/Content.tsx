import dynamic from 'next/dynamic'
import { formatUnits } from 'viem'

import { contract } from '~/common/enums'
import { SpinnerBlock, useVaultBalanceUSDT } from '~/components'

import { Step } from './types'

type WithdrawVaultUSDTDialogContentProps = {
  closeDialog: () => void
  forward: (step: Step) => void
  currStep: Step
}

const DynamicIntro = dynamic(() => import('./Intro'), {
  ssr: false,
  loading: () => <SpinnerBlock />,
})

const DynamicAddWalletLogin = dynamic(
  () => import('~/components/Dialogs/AddWalletLoginDialog/Content'),
  { ssr: false, loading: () => <SpinnerBlock /> }
)

const DynamicConfirming = dynamic(() => import('./Confirming'), {
  ssr: false,
  loading: () => <SpinnerBlock />,
})

const WithdrawVaultUSDTDialogContent: React.FC<
  WithdrawVaultUSDTDialogContentProps
> = ({ closeDialog, forward, currStep }) => {
  const { data: vaultBalanceUSDTData, isLoading: vaultBalanceUSDTLoading } =
    useVaultBalanceUSDT()
  const vaultBalanceUSDT = parseFloat(
    formatUnits(
      BigInt(vaultBalanceUSDTData || '0'),
      contract.Optimism.tokenDecimals
    )
  )

  const isIntro = currStep === 'intro'
  const isConnectWallet = currStep === 'connectWallet'
  const isConfirming = currStep === 'confirming'

  return (
    <>
      {vaultBalanceUSDTLoading && <SpinnerBlock />}

      {isIntro && (
        <DynamicIntro
          amount={vaultBalanceUSDT}
          switchToConnectWallet={() => {
            forward('connectWallet')
          }}
          switchToConfirming={() => {
            forward('confirming')
          }}
          closeDialog={closeDialog}
        />
      )}

      {isConnectWallet && (
        <DynamicAddWalletLogin
          closeDialog={closeDialog}
          submitCallback={() => {
            forward('confirming')
          }}
        />
      )}

      {isConfirming && (
        <DynamicConfirming
          amount={vaultBalanceUSDT}
          closeDialog={closeDialog}
        />
      )}
    </>
  )
}

export default WithdrawVaultUSDTDialogContent
