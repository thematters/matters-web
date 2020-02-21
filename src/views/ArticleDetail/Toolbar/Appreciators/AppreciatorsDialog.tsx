import { useState } from 'react'

import { Dialog } from '~/components'

import AppreciatorsDialogContent from './AppreciatorsDialogContent'

interface AppreciatorsDialogProps {
  children: ({ open }: { open: () => void }) => React.ReactNode
}

const AppreciatorsDialog = ({ children }: AppreciatorsDialogProps) => {
  const [showDialog, setShowDialog] = useState(false)
  const open = () => setShowDialog(true)
  const close = () => setShowDialog(false)

  return (
    <>
      {children({ open })}

      <Dialog isOpen={showDialog} onDismiss={close}>
        <AppreciatorsDialogContent close={close} />
      </Dialog>
    </>
  )
}

export default AppreciatorsDialog
