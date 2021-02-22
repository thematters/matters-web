import { useState } from 'react'

import { Dialog, useEventListener } from '~/components'

import { OPEN_LIKE_COIN_DIALOG } from '~/common/enums'

import { SetupLikeCoin } from './SetupLikeCoin'

interface LikeCoinDialogProps {
  children?: ({ open }: { open: () => void }) => React.ReactNode
}

const BaseLikeCoinDialog: React.FC<LikeCoinDialogProps> = ({ children }) => {
  const [showDialog, setShowDialog] = useState(true)
  const open = () => {
    setShowDialog(true)
  }
  const close = () => setShowDialog(false)

  useEventListener(OPEN_LIKE_COIN_DIALOG, open)

  return (
    <>
      {children && children({ open })}

      <Dialog isOpen={showDialog} onDismiss={close} size="sm">
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
