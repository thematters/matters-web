import dynamic from 'next/dynamic'

import { DialogBeta, Spinner, useDialogSwitch } from '~/components'

interface RemoveWalletLoginDialogProps {
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

const DynamicContent = dynamic(() => import('./Content'), {
  loading: () => <Spinner />,
})

const BaseRemoveWalletLoginDialog = ({
  children,
}: RemoveWalletLoginDialogProps) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(true)

  return (
    <>
      {children({ openDialog })}

      <DialogBeta isOpen={show} onDismiss={closeDialog}>
        <DynamicContent closeDialog={closeDialog} />
      </DialogBeta>
    </>
  )
}

export const RemoveWalletLoginDialog = (
  props: RemoveWalletLoginDialogProps
) => (
  <DialogBeta.Lazy mounted={<BaseRemoveWalletLoginDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </DialogBeta.Lazy>
)
