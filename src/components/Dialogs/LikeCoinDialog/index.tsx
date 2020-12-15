import { useState } from 'react'

import { Dialog, useEventListener } from '~/components'

import { OPEN_LIKE_COIN_DIALOG } from '~/common/enums'

import { SetupLikeCoin } from './SetupLikeCoin'

interface LikeCoinDialogProps {
  allowEventTrigger?: boolean
  children?: ({ open }: { open: () => void }) => React.ReactNode
}

export const LikeCoinDialog: React.FC<LikeCoinDialogProps> = ({
  allowEventTrigger = false,
  children,
}) => {
  const [showDialog, setShowDialog] = useState(false)
  const open = () => {
    setShowDialog(true)
  }
  const close = () => setShowDialog(false)

  useEventListener(OPEN_LIKE_COIN_DIALOG, () => {
    if (allowEventTrigger) {
      open()
    }
  })

  return (
    <>
      {children && children({ open })}

      <Dialog isOpen={showDialog} onDismiss={close} size="sm">
        <SetupLikeCoin closeDialog={close} />
      </Dialog>
    </>
  )
}
