import { gql, useQuery } from '@apollo/client'
import dynamic from 'next/dynamic'
import { useState } from 'react'

import { Button, Dialog, Spinner, Translate } from '~/components'
import { useMutation } from '~/components/GQL'
import CLIENT_PREFERENCE from '~/components/GQL/queries/clientPreference'

import { ADD_TOAST, TEXT, TextId } from '~/common/enums'
import { dom, stripHtml, subscribePush, trimLineBreaks } from '~/common/utils'

import styles from './styles.css'

import { ClientPreference } from '~/components/GQL/queries/__generated__/ClientPreference'
import { CommentDraft } from './__generated__/CommentDraft'
import { PutComment } from './__generated__/PutComment'

const CommentEditor = dynamic(() => import('~/components/Editor/Comment'), {
  ssr: false,
  loading: Spinner,
})

export const PUT_COMMENT = gql`
  mutation PutComment($input: PutCommentInput!) {
    putComment(input: $input) {
      id
      content
    }
  }
`

const COMMENT_DRAFT = gql`
  query CommentDraft($id: ID!) {
    commentDraft(input: { id: $id }) @client(always: true) {
      id
      content
    }
  }
`

export interface CommentFormProps {
  commentId?: string
  articleId: string
  replyToId?: string
  parentId?: string

  defaultContent?: string | null
  submitCallback?: () => void
  closeDialog: () => void
  title?: TextId
  context?: React.ReactNode
}

const CommentForm: React.FC<CommentFormProps> = ({
  commentId,
  articleId,
  replyToId,
  parentId,

  defaultContent,
  submitCallback,
  closeDialog,
  title = 'putComment',
  context,
}) => {
  // retrieve comment draft
  const commentDraftId = `${articleId}:${commentId || 0}:${parentId || 0}:${
    replyToId || 0
  }`
  const formId = `comment-form-${commentDraftId}`

  const { data, client } = useQuery<CommentDraft>(COMMENT_DRAFT, {
    variables: { id: commentDraftId },
  })

  // retrieve push setting
  const { data: clientPreferenceData } = useQuery<ClientPreference>(
    CLIENT_PREFERENCE
  )

  const [putComment] = useMutation<PutComment>(PUT_COMMENT)
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
        parentId,
        mentions,
      },
    }

    const push = clientPreferenceData?.clientPreference.push
    const skipPushButton = !push || !push.supported || push.enabled

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
            content: skipPushButton ? (
              <Translate zh_hant="評論已送出" zh_hans="评论已送出" />
            ) : (
              <Translate id="pushDescription" />
            ),
            customButton: !skipPushButton && (
              <Button onClick={subscribePush}>
                <Translate id="confirmPush" />
              </Button>
            ),
            buttonPlacement: 'center',
          },
        })
      )

      if (submitCallback) {
        submitCallback()
      }

      closeDialog()
    } catch (e) {
      console.error(e)
    }

    setSubmitting(false)
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
        close={closeDialog}
        closeTextId="close"
        rightButton={
          <Dialog.Header.RightButton
            type="submit"
            form={formId}
            disabled={isSubmitting || !isValid}
            text={<Translate zh_hant="送出" zh_hans="送出" />}
            loading={isSubmitting}
          />
        }
      />

      <Dialog.Content spacing={['base', 'base']} hasGrow>
        {context && <section className="context">{context}</section>}

        <form
          id={formId}
          onSubmit={handleSubmit}
          aria-label={TEXT.zh_hant.putComment}
        >
          <CommentEditor content={content} update={onUpdate} />
        </form>
      </Dialog.Content>

      <style jsx>{styles}</style>
    </>
  )
}

export default CommentForm
