import dynamic from 'next/dynamic'

import { DialogBeta, Spinner, useDialogSwitch } from '~/components'

interface SetEmailDialogProps {
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

const DynamicContent = dynamic(() => import('./Content'), { loading: Spinner })

const BaseSetEmailDialog = ({ children }: SetEmailDialogProps) => {
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

export const SetEmailDialog = (props: SetEmailDialogProps) => (
  <DialogBeta.Lazy mounted={<BaseSetEmailDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </DialogBeta.Lazy>
)
