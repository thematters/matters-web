import dynamic from 'next/dynamic'

import { DialogBeta, Spinner, useDialogSwitch } from '~/components'

interface AddWalletLoginDialogProps {
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

const DynamicContent = dynamic(() => import('./Content'), {
  loading: () => <Spinner />,
})

const BaseAddWalletLoginDialog = ({ children }: AddWalletLoginDialogProps) => {
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

export const AddWalletLoginDialog = (props: AddWalletLoginDialogProps) => (
  <DialogBeta.Lazy mounted={<BaseAddWalletLoginDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </DialogBeta.Lazy>
)
