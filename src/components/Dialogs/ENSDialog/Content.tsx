import dynamic from 'next/dynamic'
import { useState } from 'react'

import { Spinner } from '~/components'

import { BaseENSDialogProps, Step } from './types'

type ENSDialogContentProps = BaseENSDialogProps & {
  closeDialog: () => void
  forward: (step: Step) => void
  currStep: Step
}

const DynamicConnectWallet = dynamic(() => import('./ConnectWallet'), {
  ssr: false,
  loading: () => <Spinner />,
})
const DynamicWalletAuthFormSelect = dynamic(
  () => import('~/components/Forms/WalletAuthForm/Select'),
  { ssr: false, loading: () => <Spinner /> }
)
const DynamicLinkENS = dynamic(() => import('./LinkENS'), {
  ssr: false,
  loading: () => <Spinner />,
})
const DynamicComplete = dynamic(() => import('./Complete'), {
  ssr: false,
  loading: () => <Spinner />,
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
    <>
      {isConfirmAddress && (
        <DynamicConnectWallet
          switchToWalletSelect={() => {
            forward('walletSelect')
          }}
          switchToLinkENS={() => {
            forward('linkENS')
          }}
          closeDialog={closeDialog}
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
          closeDialog={closeDialog}
        />
      )}

      {isComplete && txHash && <DynamicComplete txHash={txHash} />}
    </>
  )
}

export default ENSDialogContent
