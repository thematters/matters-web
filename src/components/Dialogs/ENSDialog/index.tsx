import dynamic from 'next/dynamic'
import { useState } from 'react'

import { Dialog, Spinner, useDialogSwitch, useStep } from '~/components'
import { UserProfileUserPublicQuery } from '~/gql/graphql'

type Step = 'connectWallet' | 'walletSelect' | 'linkENS' | 'complete'

interface ENSDialogProps {
  user: UserProfileUserPublicQuery['user']
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
  completeCallback?: () => void
  defaultStep?: Step
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

const BaseENSDilaog = ({
  children,
  user,
  defaultStep = 'connectWallet',
}: ENSDialogProps) => {
  const {
    show,
    openDialog: baseOpenDialog,
    closeDialog: baseCloseDialog,
  } = useDialogSwitch(true)

  const { currStep, forward } = useStep<Step>(defaultStep)

  const openDialog = () => {
    forward(defaultStep)
    baseOpenDialog()
  }

  const closeDialog = () => {
    baseCloseDialog()
  }

  const isConfirmAddress = currStep === 'connectWallet'
  const isWalletSelect = currStep === 'walletSelect'
  const isLinkENS = currStep === 'linkENS'
  const isComplete = currStep === 'complete'

  const [txHash, setTxHash] = useState('')

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog} size="sm">
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
      </Dialog>
    </>
  )
}

export const ENSDialog = (props: ENSDialogProps) => (
  <Dialog.Lazy mounted={<BaseENSDilaog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
)
