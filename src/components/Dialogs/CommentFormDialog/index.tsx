import { useEffect, useState } from 'react'

import { Dialog } from '~/components'

import CommentForm, { CommentFormProps } from './CommentForm'

type CommentFormDialogProps = {
  children: ({ open }: { open: () => void }) => React.ReactNode
} & Omit<CommentFormProps, 'closeDialog'>

const BaseCommentFormDialog = ({
  children,
  ...props
}: CommentFormDialogProps) => {
  const [showDialog, setShowDialog] = useState(true)
  const open = () => setShowDialog(true)
  const close = () => setShowDialog(false)

  // FIXME: editor can't be focused with dialog on Android devices
  useEffect(() => {
    if (!showDialog) {
      return
    }

    const $editor = document.querySelector('.ql-editor') as HTMLElement

    if ($editor) {
      $editor.focus()
    }
  })

  return (
    <>
      {children && children({ open })}

      <Dialog isOpen={showDialog} onDismiss={close}>
        <CommentForm {...props} closeDialog={close} />
      </Dialog>
    </>
  )
}

export const CommentFormDialog = (props: CommentFormDialogProps) => (
  <Dialog.Lazy>
    {({ open, mounted }) =>
      mounted ? (
        <BaseCommentFormDialog {...props} />
      ) : (
        <>{props.children({ open })}</>
      )
    }
  </Dialog.Lazy>
)
