import { Editor } from '@matters/matters-editor'
import { useContext, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import {
  MAX_ARTICLE_COMMENT_LENGTH,
  OPEN_UNIVERSAL_AUTH_DIALOG,
  UNIVERSAL_AUTH_TRIGGER,
} from '~/common/enums'
import { dom, stripHtml, trimCommentContent } from '~/common/utils'
import {
  Button,
  CommentDraftsContext,
  SpinnerBlock,
  TextIcon,
  useMutation,
  useRoute,
  ViewerContext,
} from '~/components'
import CommentEditor from '~/components/Editor/Comment'
import {
  updateArticleComments,
  updateArticlePublic,
  updateCommentDetail,
} from '~/components/GQL'
import PUT_COMMENT_BETA from '~/components/GQL/mutations/putCommentBeta'
import { PutCommentBetaMutation } from '~/gql/graphql'

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

  showClear?: boolean
  placeholder?: string
  syncQuote?: boolean
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
  showClear,
  placeholder,
  syncQuote,
}) => {
  const intl = useIntl()
  const viewer = useContext(ViewerContext)
  const { getDraft, updateDraft, removeDraft } =
    useContext(CommentDraftsContext)
  const { getQuery, routerLang } = useRoute()
  const shortHash = getQuery('shortHash')
  const [editor, setEditor] = useState<Editor | null>(null)

  // retrieve comment draft
  const commentDraftId = `${articleId}-${type}-${commentId || 0}-${
    parentId || 0
  }-${replyToId || 0}`
  const formId = `comment-form-${commentDraftId}`

  const [putComment] = useMutation<PutCommentBetaMutation>(PUT_COMMENT_BETA)
  const [isSubmitting, setSubmitting] = useState(false)
  const [content, setContent] = useState(
    getDraft(commentDraftId) || defaultContent || ''
  )

  const contentCount = stripHtml(content).length

  const isValid = contentCount > 0 && contentCount <= MAX_ARTICLE_COMMENT_LENGTH

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const mentions = dom.getAttributes('data-id', content)
    const trimContent = trimCommentContent(content)
    const input = {
      id: commentId,
      comment: {
        content: trimContent,
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

          if (!!parentId) {
            updateArticlePublic({
              cache,
              shortHash,
              routerLang,
              type: 'addSecondaryComment',
            })
          } else {
            updateArticlePublic({
              cache,
              shortHash,
              routerLang,
              type: 'addComment',
            })
          }
        },
      })

      setSubmitting(false)

      if (submitCallback) {
        submitCallback()
      }

      onClear()

      if (closeCallback) {
        closeCallback()
      }
    } catch (e) {
      setSubmitting(false)
      console.error(e)
    }
  }

  const onClear = () => {
    setContent('')
    if (editor) {
      editor.commands.setContent('')
    }
    removeDraft(commentDraftId)
  }

  const onUpdate = ({ content: newContent }: { content: string }) => {
    setContent(newContent)
    updateDraft(commentDraftId, newContent)
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
          syncQuote={syncQuote}
          setEditor={(editor) => {
            setEditor(editor)
          }}
        />
      </section>

      <footer className={styles.footer}>
        {contentCount > MAX_ARTICLE_COMMENT_LENGTH && (
          <span className={styles.count}>
            {contentCount}/{MAX_ARTICLE_COMMENT_LENGTH}
          </span>
        )}
        {!!closeCallback && (
          <Button
            size={[null, '2rem']}
            spacing={[0, 16]}
            bgColor="white"
            disabled={isSubmitting}
            onClick={closeCallback}
            textColor="black"
            textActiveColor="greyDarker"
          >
            <TextIcon size={14}>
              <FormattedMessage defaultMessage="Cancel" id="47FYwb" />
            </TextIcon>
          </Button>
        )}
        {showClear && content.length > 0 && (
          <Button
            size={[null, '2rem']}
            spacing={[0, 16]}
            bgColor="white"
            disabled={isSubmitting}
            onClick={onClear}
            textColor="black"
            textActiveColor="greyDarker"
          >
            <TextIcon size={14}>
              <FormattedMessage defaultMessage="Clear" id="/GCoTA" />
            </TextIcon>
          </Button>
        )}
        {viewer.isAuthed && (
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
              size={14}
              icon={isSubmitting && <SpinnerBlock size={14} />}
            >
              {isSubmitting ? null : (
                <FormattedMessage defaultMessage="Publish" id="syEQFE" />
              )}
            </TextIcon>
          </Button>
        )}
        {!viewer.isAuthed && (
          <Button
            size={[null, '2rem']}
            spacing={[0, 16]}
            bgColor="green"
            onClick={() => {
              window.dispatchEvent(
                new CustomEvent(OPEN_UNIVERSAL_AUTH_DIALOG, {
                  detail: { trigger: UNIVERSAL_AUTH_TRIGGER.collectArticle },
                })
              )
            }}
          >
            <TextIcon color="white" size={14}>
              <FormattedMessage defaultMessage="Sign In" id="Ub+AGc" />
            </TextIcon>
          </Button>
        )}
      </footer>
    </form>
  )
}
