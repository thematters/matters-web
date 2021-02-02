import { Dialog, useDialogSwitch } from '~/components'

import CommentForm, { CommentFormProps } from './CommentForm'

type CommentFormDialogProps = {
  children: ({ open }: { open: () => void }) => React.ReactNode
} & Omit<CommentFormProps, 'closeDialog'>

const BaseCommentFormDialog = ({
  children,
  ...props
}: CommentFormDialogProps) => {
  const { show, open, close } = useDialogSwitch(true)

  // FIXME: editor can't be focused with dialog on Android devices
  const focusEditor = () => {
    const $editor = document.querySelector('.ql-editor') as HTMLElement
    if ($editor) {
      $editor.focus()
    }
  }

  const onRest = () => {
    if (show) {
      focusEditor()
    }
  }

  return (
    <>
      {children && children({ open })}

      <Dialog isOpen={show} onDismiss={close} onRest={onRest} fixedHeight>
        <CommentForm {...props} closeDialog={close} />
      </Dialog>
    </>
  )
}

export const CommentFormDialog = (props: CommentFormDialogProps) => (
  <Dialog.Lazy mounted={<BaseCommentFormDialog {...props} />}>
    {({ open }) => <>{props.children({ open })}</>}
  </Dialog.Lazy>
)
