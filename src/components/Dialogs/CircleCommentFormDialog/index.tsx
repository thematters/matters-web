import { useRef } from 'react'

import { TEST_ID } from '~/common/enums'
import { Dialog, useDialogSwitch } from '~/components'

import CommentForm, { CircleCommentFormProps } from './CommentForm'

export type CircleCommentFormDialogProps = {
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
} & Omit<CircleCommentFormProps, 'closeDialog'>

const BaseCommentFormDialog = ({
  children,
  ...props
}: CircleCommentFormDialogProps) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(true)
  const ref = useRef<HTMLDivElement>(null)

  return (
    <div ref={ref}>
      {children && children({ openDialog })}

      <Dialog
        isOpen={show}
        onDismiss={closeDialog}
        testId={TEST_ID.DIALOG_COMMENT_FORM}
      >
        <CommentForm {...props} closeDialog={closeDialog} />
      </Dialog>
    </div>
  )
}

export const CircleCommentFormDialog = (
  props: CircleCommentFormDialogProps
) => (
  <Dialog.Lazy mounted={<BaseCommentFormDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
)
