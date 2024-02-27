import { useQuery } from '@apollo/react-hooks'
import { useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import { MAX_ARTICLE_COMMENT_LENGTH } from '~/common/enums'
import { dom, stripHtml } from '~/common/utils'
import { Button, IconSpinner16, TextIcon, useMutation } from '~/components'
import CommentEditor from '~/components/Editor/Comment'
import { updateArticleComments, updateCommentDetail } from '~/components/GQL'
import PUT_COMMENT_BETA from '~/components/GQL/mutations/putCommentBeta'
import COMMENT_DRAFT from '~/components/GQL/queries/commentDraft'
import { CommentDraftQuery, PutCommentBetaMutation } from '~/gql/graphql'

import styles from './styles.module.css'

export type CommentFormBetaType = 'article'

export interface CommentFormBetaProps {
  commentId?: string
  replyToId?: string
  parentId?: string
  articleId?: string
  type: CommentFormBetaType
  isInCommentDetail?: boolean

  defaultContent?: string | null
  submitCallback?: () => void
  closeCallback?: () => void

  placeholder?: string
}

export const CommentFormBeta: React.FC<CommentFormBetaProps> = ({
  commentId,
  replyToId,
  parentId,
  articleId,
  type,
  isInCommentDetail,
  defaultContent,
  submitCallback,
  closeCallback,

  placeholder,
}) => {
  const intl = useIntl()

  // retrieve comment draft
  const commentDraftId = `${articleId}-${type}-${commentId || 0}-${
    parentId || 0
  }-${replyToId || 0}`
  const formId = `comment-form-${commentDraftId}`

  const { data, client } = useQuery<CommentDraftQuery>(COMMENT_DRAFT, {
    variables: { id: commentDraftId },
  })

  const [putComment] = useMutation<PutCommentBetaMutation>(PUT_COMMENT_BETA)
  const [isSubmitting, setSubmitting] = useState(false)
  const [content, setContent] = useState(
    data?.commentDraft.content || defaultContent || ''
  )

  const contentCount = stripHtml(content).trim().length

  const isValid = contentCount > 0 && contentCount <= MAX_ARTICLE_COMMENT_LENGTH

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const mentions = dom.getAttributes('data-id', content)
    const input = {
      id: commentId,
      comment: {
        content,
        replyTo: replyToId,
        articleId,
        parentId,
        type,
        mentions,
      },
    }

    event.preventDefault()
    setSubmitting(true)

    try {
      await putComment({
        variables: { input },
        update: (cache, mutationResult) => {
          if (!!parentId && !isInCommentDetail) {
            updateArticleComments({
              cache,
              articleId: articleId || '',
              commentId: parentId,
              type: 'addSecondaryComment',
              comment: mutationResult.data?.putComment,
            })
          } else if (!!parentId && isInCommentDetail) {
            updateCommentDetail({
              cache,
              commentId: parentId || '',
              type: 'add',
              comment: mutationResult.data?.putComment,
            })
          } else {
            updateArticleComments({
              cache,
              articleId: articleId || '',
              type: 'add',
              comment: mutationResult.data?.putComment,
            })
          }
        },
      })

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

      if (closeCallback) {
        closeCallback()
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
      className={styles.form}
      id={formId}
      onSubmit={handleSubmit}
      aria-label={intl.formatMessage({
        defaultMessage: 'Comment',
        id: 'hgjjhO',
        description: 'src/components/Forms/CommentFormBeta/index.tsx',
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
        {contentCount > MAX_ARTICLE_COMMENT_LENGTH && (
          <p className={styles.count}>
            {contentCount}/{MAX_ARTICLE_COMMENT_LENGTH}
          </p>
        )}
        {!!closeCallback && (
          <Button
            size={[null, '2rem']}
            spacing={[0, 'base']}
            bgColor="white"
            disabled={isSubmitting}
            onClick={closeCallback}
            textColor="black"
            textActiveColor="greyDarker"
          >
            <TextIcon size="sm">
              <FormattedMessage defaultMessage="Cancel" id="47FYwb" />
            </TextIcon>
          </Button>
        )}
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
            size="sm"
            icon={isSubmitting && <IconSpinner16 size="sm" />}
          >
            {isSubmitting ? null : (
              <FormattedMessage
                defaultMessage="Published"
                description="src/components/Forms/CommentFormBeta/index.tsx"
                id="QGBMmO"
              />
            )}
          </TextIcon>
        </Button>
      </footer>
    </form>
  )
}
