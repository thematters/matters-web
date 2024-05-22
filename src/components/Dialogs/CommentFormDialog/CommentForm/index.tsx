import { useQuery } from '@apollo/react-hooks'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import { FormattedMessage } from 'react-intl'

import { COMMENT_TYPE_TEXT } from '~/common/enums'
import { dom, stripHtml } from '~/common/utils'
import {
  CommentFormType,
  Dialog,
  SpinnerBlock,
  toast,
  useMutation,
} from '~/components'
import PUT_COMMENT from '~/components/GQL/mutations/putComment'
import COMMENT_DRAFT from '~/components/GQL/queries/commentDraft'
import { CommentDraftQuery, PutCommentMutation } from '~/gql/graphql'

import styles from './styles.module.css'

const CommentEditor = dynamic(() => import('~/components/Editor/Comment'), {
  ssr: false,
  loading: () => <SpinnerBlock />,
})

export interface CommentFormProps {
  commentId?: string
  replyToId?: string
  parentId?: string
  circleId?: string
  articleId?: string
  type: CommentFormType

  defaultContent?: string | null
  submitCallback?: () => void
  closeDialog: () => void
  title?: React.ReactNode
  context?: React.ReactNode
}

const CommentForm: React.FC<CommentFormProps> = ({
  commentId,
  replyToId,
  parentId,
  articleId,
  circleId,
  type,

  defaultContent,
  submitCallback,
  closeDialog,
  title = (
    <FormattedMessage
      defaultMessage="Comment"
      id="Ix3e3Q"
      description="src/components/Forms/CommentForm/index.tsx"
    />
  ),
  context,

  ...props
}) => {
  // retrieve comment draft
  const commentDraftId = `${articleId || circleId}:${commentId || 0}:${
    parentId || 0
  }:${replyToId || 0}`
  const formId = `comment-form-${commentDraftId}`

  const { data, client } = useQuery<CommentDraftQuery>(COMMENT_DRAFT, {
    variables: { id: commentDraftId },
  })

  const [putComment] = useMutation<PutCommentMutation>(PUT_COMMENT)
  const [isSubmitting, setSubmitting] = useState(false)
  const [content, setContent] = useState(
    data?.commentDraft.content || defaultContent || ''
  )
  const isValid = stripHtml(content).length > 0

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const mentions = dom.getAttributes('data-id', content)
    const input = {
      id: commentId,
      comment: {
        content,
        replyTo: replyToId,
        articleId,
        circleId,
        parentId,
        type,
        mentions,
      },
    }

    event.preventDefault()
    setSubmitting(true)

    try {
      await putComment({ variables: { input } })

      setContent('')

      // clear draft
      client.writeData({
        id: `CommentDraft:${commentDraftId}`,
        data: { content: '' },
      })

      toast.success({
        message: commentId ? (
          <FormattedMessage
            defaultMessage="{type} edited"
            id="AlHYvk"
            values={{ type: COMMENT_TYPE_TEXT.en[type] }}
          />
        ) : (
          <FormattedMessage
            defaultMessage="{type} sent"
            id="aPxJXi"
            values={{ type: COMMENT_TYPE_TEXT.en[type] }}
          />
        ),
      })

      setSubmitting(false)

      if (submitCallback) {
        submitCallback()
      }

      closeDialog()
    } catch (e) {
      setSubmitting(false)
      console.error(e)
    }
  }

  const onUpdate = ({ content: newContent }: { content: string }) => {
    setContent(newContent)

    client.writeData({
      id: `CommentDraft:${commentDraftId}`,
      data: { content: newContent },
    })
  }

  return (
    <>
      <Dialog.Header
        title={title}
        closeDialog={closeDialog}
        rightBtn={
          <Dialog.TextButton
            type="submit"
            form={formId}
            disabled={isSubmitting || !isValid}
            text={<FormattedMessage defaultMessage="Send" id="9WRlF4" />}
            loading={isSubmitting}
          />
        }
      />

      <Dialog.Content>
        {context && <section className={styles.context}>{context}</section>}

        <form className={styles.form} id={formId} onSubmit={handleSubmit}>
          <CommentEditor content={content} update={onUpdate} />
        </form>
      </Dialog.Content>

      <Dialog.Footer
        smUpBtns={
          <>
            <Dialog.TextButton
              text={<FormattedMessage defaultMessage="Cancel" id="47FYwb" />}
              color="greyDarker"
              onClick={closeDialog}
            />
            <Dialog.TextButton
              type="submit"
              form={formId}
              disabled={isSubmitting || !isValid}
              text={<FormattedMessage defaultMessage="Send" id="9WRlF4" />}
              loading={isSubmitting}
            />
          </>
        }
      />
    </>
  )
}

export default CommentForm
