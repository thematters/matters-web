import { useQuery } from '@apollo/react-hooks'
import dynamic from 'next/dynamic'
import { useId, useState } from 'react'

import { ADD_TOAST, COMMENT_TYPE_TEXT, TextId } from '~/common/enums'
import { dom, stripHtml, trimLineBreaks } from '~/common/utils'
import {
  CommentFormType,
  Dialog,
  Spinner,
  Translate,
  useMutation,
} from '~/components'
import PUT_COMMENT from '~/components/GQL/mutations/putComment'
import COMMENT_DRAFT from '~/components/GQL/queries/commentDraft'
import { CommentDraftQuery, PutCommentMutation } from '~/gql/graphql'

import styles from './styles.css'

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
  const formId = useId()

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

      window.dispatchEvent(
        new CustomEvent(ADD_TOAST, {
          detail: {
            color: 'green',
            content: (
              <Translate
                zh_hant={`${COMMENT_TYPE_TEXT.zh_hant[type]}已送出`}
                zh_hans={`${COMMENT_TYPE_TEXT.zh_hans[type]}已送出`}
                en={`${COMMENT_TYPE_TEXT.en[type]} sent`}
              />
            ),
            buttonPlacement: 'center',
          },
        })
      )

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
        closeTextId="close"
        rightButton={
          <Dialog.Header.RightButton
            type="submit"
            form={formId}
            disabled={isSubmitting || !isValid}
            text={<Translate zh_hant="送出" zh_hans="送出" en="Send" />}
            loading={isSubmitting}
          />
        }
      />

      <Dialog.Content spacing={['base', 'base']} hasGrow>
        {context && <section className="context">{context}</section>}

        <form id={formId} onSubmit={handleSubmit}>
          <CommentEditor content={content} update={onUpdate} />
        </form>
      </Dialog.Content>

      <style jsx>{styles}</style>
    </>
  )
}

export default CommentForm
