import gql from 'graphql-tag'
import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import { COMMENT_TYPE_TEXT, TEST_ID } from '~/common/enums'
import {
  CommentFormType,
  Dialog,
  LanguageContext,
  toast,
  useDialogSwitch,
  useMutation,
  useRoute,
} from '~/components'
import { updateArticleComments, updateArticlePublic } from '~/components/GQL'
import {
  DeleteCommentMutation,
  DropdownActionsCommentBetaPublicFragment,
} from '~/gql/graphql'

const DELETE_COMMENT = gql`
  mutation DeleteComment($id: ID!) {
    deleteComment(input: { id: $id }) {
      id
      state
    }
  }
`

export interface DeleteCommentDialogProps {
  comment: DropdownActionsCommentBetaPublicFragment
  type: CommentFormType
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

const DeleteCommentDialog = ({
  comment,
  type,
  children,
}: DeleteCommentDialogProps) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(true)
  const { router, routerLang } = useRoute()
  const commentId = comment.id
  const article =
    comment.node.__typename === 'Article' ? comment.node : undefined

  const { lang } = useContext(LanguageContext)

  const [deleteComment] = useMutation<DeleteCommentMutation>(DELETE_COMMENT, {
    variables: { id: commentId },
    optimisticResponse: {
      deleteComment: {
        id: commentId,
        state: 'archived' as any,
        __typename: 'Comment',
      },
    },
    update: (cache) => {
      if (!article) {
        return
      }

      updateArticleComments({
        cache,
        commentId: comment.id,
        articleId: article.id,
        type: 'delete',
      })

      const articleIdFromRouter =
        (router.query.mediaHash as string)?.match(/^(\d+)/)?.[1] || ''

      updateArticlePublic({
        cache,
        articleId: articleIdFromRouter,
        mediaHash: article.mediaHash,
        routerLang,
        type: 'deleteComment',
      })
    },
  })

  const onDelete = async () => {
    await deleteComment()

    toast.success({
      message: (
        <FormattedMessage
          defaultMessage="{commentType} has been deleted"
          id="h9CG9E"
          description="src/components/Comment/DropdownActions/DeleteComment/Dialog.tsx"
          values={{
            commentType: COMMENT_TYPE_TEXT[lang][type],
          }}
        />
      ),
    })
  }

  return (
    <>
      {children({ openDialog })}

      <Dialog
        isOpen={show}
        onDismiss={closeDialog}
        testId={TEST_ID.DIALOG_COMMENT_DELETE}
      >
        <Dialog.Header
          title={
            <FormattedMessage
              defaultMessage="Delete {commentType}"
              id="Cdkhl8"
              description="src/components/Comment/DropdownActions/DeleteComment/Dialog.tsx"
              values={{
                commentType: COMMENT_TYPE_TEXT[lang][type],
              }}
            />
          }
        />

        <Dialog.Content>
          <Dialog.Content.Message>
            <p>
              <FormattedMessage
                defaultMessage="After deletion, the {commentType} will be removed immediately"
                id="77tYPg"
                description="src/components/Comment/DropdownActions/DeleteComment/Dialog.tsx"
                values={{
                  commentType: COMMENT_TYPE_TEXT[lang][type],
                }}
              />
            </p>
          </Dialog.Content.Message>
        </Dialog.Content>

        <Dialog.Footer
          closeDialog={closeDialog}
          btns={
            <Dialog.RoundedButton
              text={<FormattedMessage defaultMessage="Delete" id="K3r6DQ" />}
              color="red"
              onClick={() => {
                onDelete()
                closeDialog()
              }}
            />
          }
          smUpBtns={
            <Dialog.TextButton
              text={<FormattedMessage defaultMessage="Delete" id="K3r6DQ" />}
              color="red"
              onClick={() => {
                onDelete()
                closeDialog()
              }}
            />
          }
        />
      </Dialog>
    </>
  )
}

const LazyDeleteCommentDialog = (props: DeleteCommentDialogProps) => (
  <Dialog.Lazy mounted={<DeleteCommentDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
)

export default LazyDeleteCommentDialog
