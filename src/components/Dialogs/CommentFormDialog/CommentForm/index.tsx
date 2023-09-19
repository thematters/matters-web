import { useQuery } from '@apollo/react-hooks'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import { FormattedMessage } from 'react-intl'

import { COMMENT_TYPE_TEXT, TextId } from '~/common/enums'
import { dom, stripHtml, trimLineBreaks } from '~/common/utils'
import {
  CommentFormType,
  Dialog,
  Spinner,
  toast,
  Translate,
  useMutation,
} from '~/components'
import PUT_COMMENT from '~/components/GQL/mutations/putComment'
import COMMENT_DRAFT from '~/components/GQL/queries/commentDraft'
import { CommentDraftQuery, PutCommentMutation } from '~/gql/graphql'

import styles from './styles.module.css'

const CommentEditor = dynamic(() => import('~/components/Editor/Comment'), {
  ssr: false,
  loading: Spinner,
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
  title?: TextId
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
  title = 'putComment',
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
  const isValid = stripHtml(content).trim().length > 0

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const mentions = dom.getAttributes('data-id', content)
    const input = {
      id: commentId,
      comment: {
        content: trimLineBreaks(content),
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
          <Translate
            zh_hant={`${COMMENT_TYPE_TEXT.zh_hant[type]}已編輯`}
            zh_hans={`${COMMENT_TYPE_TEXT.zh_hans[type]}已编辑`}
            en={`${COMMENT_TYPE_TEXT.en[type]} edited`}
          />
        ) : (
          <Translate
            zh_hant={`${COMMENT_TYPE_TEXT.zh_hant[type]}已送出`}
            zh_hans={`${COMMENT_TYPE_TEXT.zh_hans[type]}已送出`}
            en={`${COMMENT_TYPE_TEXT.en[type]} sent`}
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
            text={<Translate zh_hant="送出" zh_hans="送出" en="Send" />}
            loading={isSubmitting}
          />
        }
      />

      <Dialog.Content smExtraSpacing>
        {context && <section className={styles.context}>{context}</section>}

        <form className={styles.form} id={formId} onSubmit={handleSubmit}>
          <CommentEditor content={content} update={onUpdate} />
        </form>
      </Dialog.Content>

      <Dialog.Footer
        smUpBtns={
          <>
            <Dialog.TextButton
              text={<FormattedMessage defaultMessage="Cancel" />}
              color="greyDarker"
              onClick={closeDialog}
            />
            <Dialog.TextButton
              type="submit"
              form={formId}
              disabled={isSubmitting || !isValid}
              text={<Translate zh_hant="送出" zh_hans="送出" en="Send" />}
              loading={isSubmitting}
            />
          </>
        }
      />
    </>
  )
}

export default CommentForm
