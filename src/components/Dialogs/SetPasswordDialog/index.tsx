import dynamic from 'next/dynamic'

import { DialogBeta, Spinner, useDialogSwitch } from '~/components'

interface SetPasswordDialogProps {
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

const DynamicContent = dynamic(() => import('./Content'), { loading: Spinner })

const BaseSetPasswordDialog = ({ children }: SetPasswordDialogProps) => {
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

export const SetPasswordDialog = (props: SetPasswordDialogProps) => (
  <DialogBeta.Lazy mounted={<BaseSetPasswordDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </DialogBeta.Lazy>
)
