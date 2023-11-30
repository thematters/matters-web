import dynamic from 'next/dynamic'

import { Dialog, Spinner, useDialogSwitch } from '~/components'

interface SetPasswordDialogProps {
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

const DynamicContent = dynamic(() => import('./Content'), {
  loading: () => <Spinner />,
})

const BaseSetPasswordDialog = ({ children }: SetPasswordDialogProps) => {
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

export const SetPasswordDialog = (props: SetPasswordDialogProps) => (
  <Dialog.Lazy mounted={<BaseSetPasswordDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
)
