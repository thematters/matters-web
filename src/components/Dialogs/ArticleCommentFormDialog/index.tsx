import { useRef } from 'react'

import { TEST_ID } from '~/common/enums'
import { Dialog, useDialogSwitch } from '~/components'

import CommentForm, { CommentFormProps } from './CommentForm'

export type ArticleCommentFormDialogProps = {
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
} & Omit<CommentFormProps, 'closeDialog'>

const BaseArticleCommentFormDialog = ({
  children,
  ...props
}: ArticleCommentFormDialogProps) => {
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

export const ArticleCommentFormDialog = (
  props: ArticleCommentFormDialogProps
) => (
  <Dialog.Lazy mounted={<BaseArticleCommentFormDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
)
