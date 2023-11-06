import { useQuery } from '@apollo/react-hooks'
import dynamic from 'next/dynamic'
import { useContext, useState } from 'react'

import { dom, stripHtml, translate } from '~/common/utils'
import {
  Button,
  IconSpinner16,
  LanguageContext,
  Spinner,
  TextIcon,
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

export type CommentFormType = 'article' | 'circleDiscussion' | 'circleBroadcast'

export interface CommentFormProps {
  commentId?: string
  replyToId?: string
  parentId?: string
  circleId?: string
  articleId?: string
  type: CommentFormType

  defaultContent?: string | null
  submitCallback?: () => void

  placeholder?: string
}

export const CommentForm: React.FC<CommentFormProps> = ({
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
  const { lang } = useContext(LanguageContext)

  // retrieve comment draft
  const commentDraftId = `${articleId || circleId}-${type}-${commentId || 0}-${
    parentId || 0
  }-${replyToId || 0}`
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
      aria-label={translate({ id: 'putComment', lang })}
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
          spacing={[0, 'base']}
          bgColor="green"
          disabled={isSubmitting || !isValid}
        >
          <TextIcon
            color="white"
            size="mdS"
            weight="md"
            icon={isSubmitting && <IconSpinner16 size="sm" />}
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
