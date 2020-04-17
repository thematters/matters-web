import { useState } from 'react'

import { Dialog } from '~/components'

import Content from './Content'

interface EmailDialogProps {
  children: ({ open }: { open: () => void }) => React.ReactNode
}

const BaseEmailDialog = ({ children }: EmailDialogProps) => {
  const [showDialog, setShowDialog] = useState(true)
  const open = () => setShowDialog(true)
  const close = () => setShowDialog(false)

  return (
    <>
      {children({ open })}

      <Dialog isOpen={showDialog} onDismiss={close} fixedHeight>
        <Content closeDialog={close} />
      </Dialog>
    </>
  )
}

export const EmailDialog = (props: EmailDialogProps) => (
  <Dialog.Lazy>
    {({ open, mounted }) =>
      mounted ? <BaseEmailDialog {...props} /> : <>{props.children({ open })}</>
    }
  </Dialog.Lazy>
)
