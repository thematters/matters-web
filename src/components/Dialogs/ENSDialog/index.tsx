import dynamic from 'next/dynamic'

import { Dialog, Spinner, useDialogSwitch, useStep } from '~/components'

import { UserProfileUserPublic_user } from '~/components/UserProfile/__generated__/UserProfileUserPublic'

type Step = 'confirmAddress' | 'walletSelect' | 'bindIPNS'

interface ENSDialogProps {
  user: UserProfileUserPublic_user
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
  completeCallback?: () => void
  defaultStep?: Step
}

const DynamicConfirmAddress = dynamic(() => import('./DefaultContent'))

const DynamicWalletAuthFormSelect = dynamic(
  () => import('~/components/Forms/WalletAuthForm/Select'),
  { ssr: false, loading: Spinner }
)

const DynamicLinkENS = dynamic(() => import('./LinkENSContent'))

const BaseENSDilaog = ({
  children,
  user,
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
  const isBindIPNS = currStep === 'bindIPNS'

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
              forward('bindIPNS')
            }}
            closeDialog={closeDialog}
          />
        )}

        {isBindIPNS && <DynamicLinkENS user={user} />}
      </Dialog>
    </>
  )
}

export const ENSDialog = (props: ENSDialogProps) => (
  <Dialog.Lazy mounted={<BaseENSDilaog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
)
