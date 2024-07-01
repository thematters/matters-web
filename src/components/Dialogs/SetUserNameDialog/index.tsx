import dynamic from 'next/dynamic'

import { OPEN_SET_USER_NAME_DIALOG } from '~/common/enums'
import {
  Dialog,
  SpinnerBlock,
  useDialogSwitch,
  useEventListener,
} from '~/components'

interface SetUserNameDialogProps {
  children?: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

const DynamicContent = dynamic(() => import('./Content'), {
  loading: () => <SpinnerBlock />,
})

const BaseSetUserNameDialog = ({ children }: SetUserNameDialogProps) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(true)

  return (
    <>
      {children && children({ openDialog })}

      <Dialog
        isOpen={show}
        onDismiss={closeDialog}
        dismissOnHandle={false}
        dismissOnClickOutside={false}
        dismissOnESC={false}
      >
        <DynamicContent closeDialog={closeDialog} />
      </Dialog>
    </>
  )
}

export const SetUserNameDialog = (props: SetUserNameDialogProps) => {
  const Children = ({ openDialog }: { openDialog: () => void }) => {
    useEventListener(OPEN_SET_USER_NAME_DIALOG, openDialog)
    return <>{props.children && props.children({ openDialog })}</>
  }

  return (
    <Dialog.Lazy mounted={<BaseSetUserNameDialog {...props} />}>
      {({ openDialog }) => <Children openDialog={openDialog} />}
    </Dialog.Lazy>
  )
}
