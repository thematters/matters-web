import { useState } from 'react'

import { Dialog } from '~/components'

import CommentForm, { CommentFormProps } from './CommentForm'

type CommentFormDialogProps = {
  children: ({ open }: { open: () => void }) => React.ReactNode
} & Omit<CommentFormProps, 'closeDialog'>

export const CommentFormDialog = ({
  children,
  ...props
}: CommentFormDialogProps) => {
  const [showDialog, setShowDialog] = useState(false)
  const open = () => setShowDialog(true)
  const close = () => setShowDialog(false)

  return (
    <>
      {children && children({ open })}

      <Dialog isOpen={showDialog} onDismiss={close}>
        <CommentForm {...props} closeDialog={close} />
      </Dialog>
    </>
  )
}
