import dynamic from 'next/dynamic'

import { Dialog, SpinnerBlock, useDialogSwitch } from '~/components'

interface RemoveWalletLoginDialogProps {
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

const DynamicContent = dynamic(() => import('./Content'), {
  loading: () => <SpinnerBlock />,
})

const BaseRemoveWalletLoginDialog = ({
  children,
}: RemoveWalletLoginDialogProps) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(true)

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog}>
        <DynamicContent closeDialog={closeDialog} />
      </Dialog>
    </>
  )
}

export const RemoveWalletLoginDialog = (
  props: RemoveWalletLoginDialogProps
) => (
  <Dialog.Lazy mounted={<BaseRemoveWalletLoginDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
)
