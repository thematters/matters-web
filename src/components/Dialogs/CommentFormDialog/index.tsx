import { useRef } from 'react'

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
  const ref: React.RefObject<HTMLDivElement> | null = useRef(null)

  // FIXME: editor can't be focused with dialog on Android devices
  const focusEditor = () => {
    if (!show) {
      return
    }

    const $editor = ref.current?.querySelector('.ql-editor') as HTMLElement
    if ($editor) {
      $editor.focus()
    }
  }

  return (
    <div ref={ref}>
      {children && children({ open })}

      <Dialog isOpen={show} onDismiss={close} onRest={focusEditor} fixedHeight>
        <CommentForm {...props} closeDialog={close} />
      </Dialog>
    </div>
  )
}

export const CommentFormDialog = (props: CommentFormDialogProps) => (
  <Dialog.Lazy mounted={<BaseCommentFormDialog {...props} />}>
    {({ open }) => <>{props.children({ open })}</>}
  </Dialog.Lazy>
)
