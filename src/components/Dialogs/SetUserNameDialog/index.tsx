import dynamic from 'next/dynamic'

import { OPEN_SET_USER_NAME_DIALOG } from '~/common/enums'
import {
  DialogBeta,
  Spinner,
  useDialogSwitch,
  useEventListener,
} from '~/components'

interface SetUserNameDialogProps {
  children?: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

const DynamicContent = dynamic(() => import('./Content'), { loading: Spinner })

const BaseSetUserNameDialog = ({ children }: SetUserNameDialogProps) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(true)

  return (
    <>
      {children && children({ openDialog })}

      <DialogBeta isOpen={show} onDismiss={closeDialog} dismissOnHandle={false}>
        <DynamicContent closeDialog={closeDialog} />
      </DialogBeta>
    </>
  )
}

export const SetUserNameDialog = (props: SetUserNameDialogProps) => {
  const Children = ({ openDialog }: { openDialog: () => void }) => {
    useEventListener(OPEN_SET_USER_NAME_DIALOG, openDialog)
    return <>{props.children && props.children({ openDialog })}</>
  }

  return (
    <DialogBeta.Lazy mounted={<BaseSetUserNameDialog {...props} />}>
      {({ openDialog }) => <Children openDialog={openDialog} />}
    </DialogBeta.Lazy>
  )
}
