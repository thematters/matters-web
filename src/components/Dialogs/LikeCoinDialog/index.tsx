import { OPEN_LIKE_COIN_DIALOG } from '~/common/enums'
import { Dialog, useDialogSwitch, useEventListener } from '~/components'

import { SetupLikeCoin } from './SetupLikeCoin'

interface LikeCoinDialogProps {
  children?: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

const BaseLikeCoinDialog: React.FC<LikeCoinDialogProps> = ({ children }) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(true)

  useEventListener(OPEN_LIKE_COIN_DIALOG, openDialog)

  return (
    <>
      {children && children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog} size="sm">
        <SetupLikeCoin closeDialog={closeDialog} />
      </Dialog>
    </>
  )
}

export const LikeCoinDialog = (props: LikeCoinDialogProps) => {
  const Children = ({ openDialog }: { openDialog: () => void }) => {
    useEventListener(OPEN_LIKE_COIN_DIALOG, openDialog)
    return <>{props.children && props.children({ openDialog })}</>
  }

  return (
    <Dialog.Lazy mounted={<BaseLikeCoinDialog {...props} />}>
      {({ openDialog }) => <Children openDialog={openDialog} />}
    </Dialog.Lazy>
  )
}
