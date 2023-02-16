import dynamic from 'next/dynamic'
import { useState } from 'react'

import { Dialog, Spinner, WagmiProvider } from '~/components'

import { BaseENSDialogProps, Step } from './types'

type ENSDialogContentProps = BaseENSDialogProps & {
  closeDialog: () => void
  forward: (step: Step) => void
  currStep: Step
}

const DynamicConnectWallet = dynamic(() => import('./ConnectWallet'), {
  ssr: false,
  loading: Spinner,
})
const DynamicWalletAuthFormSelect = dynamic(
  () => import('~/components/Forms/WalletAuthForm/Select'),
  { ssr: false, loading: Spinner }
)
const DynamicLinkENS = dynamic(() => import('./LinkENS'), {
  ssr: false,
  loading: Spinner,
})
const DynamicComplete = dynamic(() => import('./Complete'), {
  ssr: false,
  loading: Spinner,
})

const ENSDialogContent: React.FC<ENSDialogContentProps> = ({
  closeDialog,
  forward,
  currStep,
  user,
}) => {
  const isConfirmAddress = currStep === 'connectWallet'
  const isWalletSelect = currStep === 'walletSelect'
  const isLinkENS = currStep === 'linkENS'
  const isComplete = currStep === 'complete'

  const [txHash, setTxHash] = useState('')

  return (
    <WagmiProvider>
      {!isWalletSelect && (
        <Dialog.Header closeDialog={closeDialog} title="bindIPNStoENS" />
      )}

      {isConfirmAddress && (
        <DynamicConnectWallet
          switchToWalletSelect={() => {
            forward('walletSelect')
          }}
          switchToLinkENS={() => {
            forward('linkENS')
          }}
        />
      )}

      {isWalletSelect && (
        <DynamicWalletAuthFormSelect
          purpose="dialog"
          submitCallback={() => {
            forward('linkENS')
          }}
          closeDialog={closeDialog}
        />
      )}

      {isLinkENS && (
        <DynamicLinkENS
          user={user}
          switchToWalletSelect={() => {
            forward('walletSelect')
          }}
          switchToComplete={(hash: string) => {
            setTxHash(hash)
            forward('complete')
          }}
        />
      )}

      {isComplete && txHash && <DynamicComplete txHash={txHash} />}
    </WagmiProvider>
  )
}

export default ENSDialogContent
