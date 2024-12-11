import dynamic from 'next/dynamic'

import { SpinnerBlock } from '~/components'

import { Step } from './types'

type WithdrawVaultUSDTDialogContentProps = {
  amount: number
  type?: 'connectAndClaim' | 'claim'
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

const WithdrawVaultUSDTDialogContent: React.FC<
  WithdrawVaultUSDTDialogContentProps
> = ({ amount, type, closeDialog, forward, currStep }) => {
  const isIntro = currStep === 'intro'
  const isConnectWallet = currStep === 'connectWallet'

  return (
    <>
      {isIntro && (
        <DynamicIntro
          amount={amount}
          type={type}
          switchToConnectWallet={() => {
            forward('connectWallet')
          }}
          closeDialog={closeDialog}
        />
      )}

      {isConnectWallet && (
        <DynamicAddWalletLogin
          closeDialog={closeDialog}
          submitCallback={() => {
            alert('asada')
          }}
        />
      )}
    </>
  )
}

export default WithdrawVaultUSDTDialogContent
