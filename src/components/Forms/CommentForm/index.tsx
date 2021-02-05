import { useQuery } from '@apollo/react-hooks'
import dynamic from 'next/dynamic'
import { useState } from 'react'

import {
  Button,
  IconSpinner16,
  Spinner,
  TextIcon,
  Translate,
  useMutation,
} from '~/components'
import PUT_COMMENT from '~/components/GQL/mutations/putComment'
import COMMENT_DRAFT from '~/components/GQL/queries/commentDraft'

import { TEXT } from '~/common/enums'
import { dom, stripHtml, trimLineBreaks } from '~/common/utils'

import styles from './styles.css'

import { PutComment } from '~/components/GQL/mutations/__generated__/PutComment'
import { CommentDraft } from '~/components/GQL/queries/__generated__/CommentDraft'

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
  // retrieve comment draft
  const commentDraftId = `${articleId || circleId}:${commentId || 0}:${
    parentId || 0
  }:${replyToId || 0}`
  const formId = `comment-form-${commentDraftId}`

  const { data, client } = useQuery<CommentDraft>(COMMENT_DRAFT, {
    variables: { id: commentDraftId },
  })

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

      setSubmitting(false)

      if (submitCallback) {
        submitCallback()
      }
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
      id={formId}
      onSubmit={handleSubmit}
      aria-label={TEXT.zh_hant.putComment}
    >
      <section className="content">
        <CommentEditor
          content={content}
          update={onUpdate}
          placeholder={placeholder}
        />
      </section>

      <footer>
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
            size="md-s"
            weight="md"
            icon={isSubmitting && <IconSpinner16 size="sm" />}
          >
            {isSubmitting ? null : <Translate zh_hant="送出" zh_hans="送出" />}
          </TextIcon>
        </Button>
      </footer>

      <style jsx>{styles}</style>
    </form>
  )
}
