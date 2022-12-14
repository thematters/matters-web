import dynamic from 'next/dynamic'

import { Dialog, Spinner, useDialogSwitch, useStep } from '~/components'

type Step = 'confirmAddress' | 'walletSelect'

interface ENSDialogProps {
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
  completeCallback?: () => void
  defaultStep?: Step
}

const DynamicConfirmAddress = dynamic(() => import('./DefaultContent'))

const DynamicWalletAuthFormSelect = dynamic(
  () => import('~/components/Forms/WalletAuthForm/Select'),
  { ssr: false, loading: Spinner }
)

const BaseENSDilaog = ({
  children,
  defaultStep = 'confirmAddress',
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

  const isConfirmAddress = currStep === 'confirmAddress'
  const isWalletSelect = currStep === 'walletSelect'

  return (
    <>
      {children({ openDialog })}
      <Dialog isOpen={show} onDismiss={closeDialog}>
        {!isWalletSelect && (
          <Dialog.Header
            closeDialog={closeDialog}
            leftButton={<Dialog.Header.CloseButton closeDialog={closeDialog} />}
            title={'bindIPNStoENS'}
          />
        )}
        {isConfirmAddress && (
          <DynamicConfirmAddress
            switchToWalletSelect={() => {
              forward('walletSelect')
            }}
          />
        )}

        {isWalletSelect && (
          <DynamicWalletAuthFormSelect
            purpose="dialog"
            submitCallback={() => {
              forward('confirmAddress')
            }}
            closeDialog={closeDialog}
          />
        )}
      </Dialog>
    </>
  )
}

export const ENSDialog = (props: ENSDialogProps) => (
  <Dialog.Lazy mounted={<BaseENSDilaog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
)
