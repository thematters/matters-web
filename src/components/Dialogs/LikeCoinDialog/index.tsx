import { Dialog, useDialogSwitch, useEventListener } from '~/components'

import { OPEN_LIKE_COIN_DIALOG } from '~/common/enums'

import { SetupLikeCoin } from './SetupLikeCoin'

interface LikeCoinDialogProps {
  children?: ({ open }: { open: () => void }) => React.ReactNode
}

const BaseLikeCoinDialog: React.FC<LikeCoinDialogProps> = ({ children }) => {
  const { show, open, close } = useDialogSwitch(true)

  useEventListener(OPEN_LIKE_COIN_DIALOG, open)

  return (
    <>
      {children && children({ open })}

      <Dialog isOpen={show} onDismiss={close} size="sm">
        <SetupLikeCoin closeDialog={close} />
      </Dialog>
    </>
  )
}

export const LikeCoinDialog = (props: LikeCoinDialogProps) => {
  const Children = ({ open }: { open: () => void }) => {
    useEventListener(OPEN_LIKE_COIN_DIALOG, open)
    return <>{props.children && props.children({ open })}</>
  }

  return (
    <Dialog.Lazy mounted={<BaseLikeCoinDialog {...props} />}>
      {({ open }) => <Children open={open} />}
    </Dialog.Lazy>
  )
}
