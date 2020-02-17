import { useState } from 'react'

import { Dialog, Translate } from '~/components'

import AppreciatorsDialogContent from './AppreciatorsDialogContent'

interface AppreciatorsDialogProps {
  count: string
  children: ({ open }: { open: () => void }) => React.ReactNode
}

const AppreciatorsDialog = ({ count, children }: AppreciatorsDialogProps) => {
  const [showDialog, setShowDialog] = useState(false)
  const open = () => setShowDialog(true)
  const close = () => setShowDialog(false)

  return (
    <>
      {children({ open })}

      <Dialog
        title={
          <Translate
            zh_hant={`${count} 人讚賞了作品`}
            zh_hans={`${count} 人赞赏了作品`}
          />
        }
        isOpen={showDialog}
        onDismiss={close}
      >
        <AppreciatorsDialogContent />
      </Dialog>
    </>
  )
}

export default AppreciatorsDialog
