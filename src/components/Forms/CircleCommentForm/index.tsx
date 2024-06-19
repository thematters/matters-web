import { useQuery } from '@apollo/react-hooks'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import { useIntl } from 'react-intl'

import { dom, stripHtml } from '~/common/utils'
import {
  Button,
  Spinner,
  SpinnerBlock,
  TextIcon,
  Translate,
  useMutation,
} from '~/components'
import { PUT_CIRCLE_COMMENT } from '~/components/GQL/mutations/putComment'
import COMMENT_DRAFT from '~/components/GQL/queries/commentDraft'
import { CommentDraftQuery, PutCircleCommentMutation } from '~/gql/graphql'

import styles from './styles.module.css'

const CommentEditor = dynamic(() => import('~/components/Editor/Comment'), {
  ssr: false,
  loading: () => <SpinnerBlock />,
})

export type CircleCommentFormType = 'circleDiscussion' | 'circleBroadcast'

export interface CircleCommentFormProps {
  commentId?: string
  replyToId?: string
  parentId?: string
  circleId?: string
  articleId?: string
  type: CircleCommentFormType

  defaultContent?: string | null
  submitCallback?: () => void

  placeholder?: string
}

export const CircleCommentForm: React.FC<CircleCommentFormProps> = ({
  commentId,
  replyToId,
  parentId,
  articleId,
  circleId,
  type,

  defaultContent,
  submitCallback,

  placeholder,
}) => {
  const intl = useIntl()

  // retrieve comment draft
  const commentDraftId = `${articleId || circleId}-${type}-${commentId || 0}-${
    parentId || 0
  }-${replyToId || 0}`
  const formId = `comment-form-${commentDraftId}`

  const { data, client } = useQuery<CommentDraftQuery>(COMMENT_DRAFT, {
    variables: { id: commentDraftId },
  })

  const [putComment] = useMutation<PutCircleCommentMutation>(PUT_CIRCLE_COMMENT)
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

      setSubmitting(false)

      if (submitCallback) {
        submitCallback()
      }

      // clear content
      const $editor = document.querySelector(
        `#${formId} .ProseMirror`
      ) as HTMLElement

      if ($editor) {
        $editor.innerHTML = ''
      }

      // clear draft
      client.writeData({
        id: `CommentDraft:${commentDraftId}`,
        data: { content: '' },
      })
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
    <form
      className={styles.form}
      id={formId}
      onSubmit={handleSubmit}
      aria-label={intl.formatMessage({
        defaultMessage: 'Comment',
        id: 'Ix3e3Q',
        description: 'src/components/Forms/CommentForm/index.tsx',
      })}
    >
      <section className={styles.content}>
        <CommentEditor
          content={content}
          update={onUpdate}
          placeholder={placeholder}
        />
      </section>

      <footer className={styles.footer}>
        <Button
          type="submit"
          form={formId}
          size={[null, '2rem']}
          spacing={[0, 16]}
          bgColor="green"
          disabled={isSubmitting || !isValid}
        >
          <TextIcon
            color="white"
            size={15}
            weight="medium"
            icon={isSubmitting && <Spinner size={14} />}
          >
            {isSubmitting ? null : (
              <Translate zh_hant="送出" zh_hans="送出" en="Send" />
            )}
          </TextIcon>
        </Button>
      </footer>
    </form>
  )
}
