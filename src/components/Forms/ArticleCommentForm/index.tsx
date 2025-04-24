import { Editor } from '@matters/matters-editor'
import classNames from 'classnames'
import { useContext, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import {
  MAX_ARTICLE_COMMENT_LENGTH,
  NEW_POST_COMMENT_MUTATION_RESULT,
  OPEN_UNIVERSAL_AUTH_DIALOG,
  UNIVERSAL_AUTH_TRIGGER,
} from '~/common/enums'
import {
  dom,
  formStorage,
  sanitizeContent,
  sessionStorage,
  stripHtml,
} from '~/common/utils'
import {
  Button,
  SpinnerBlock,
  TextIcon,
  useCommentEditorContext,
  useEventListener,
  useMutation,
  ViewerContext,
} from '~/components'
import CommentEditor from '~/components/Editor/Comment'
import { updateArticleComments, updateCommentDetail } from '~/components/GQL'
import { PUT_ARTICLE_COMMENT } from '~/components/GQL/mutations/putComment'
import { PutArticleCommentMutation } from '~/gql/graphql'

import styles from './styles.module.css'

export interface ArticleCommentFormProps {
  commentId?: string
  replyToId?: string
  parentId?: string
  articleId: string
  isInCommentDetail?: boolean

  defaultContent?: string | null
  submitCallback?: () => void
  closeCallback?: () => void

  showClear?: boolean
  placeholder?: string

  playAnimation?: boolean
  isFallbackEditor?: boolean
  setEditor?: (editor: Editor | null) => void
  onHideComplete?: () => void
  isHiding?: boolean
}

export const ArticleCommentForm: React.FC<ArticleCommentFormProps> = ({
  commentId,
  replyToId,
  parentId,
  articleId,
  isInCommentDetail,
  defaultContent,
  submitCallback,
  closeCallback,
  showClear,
  placeholder,
  isFallbackEditor,
  playAnimation,
  onHideComplete,
  isHiding,
  setEditor: propsSetEditor,
}) => {
  const intl = useIntl()
  const viewer = useContext(ViewerContext)
  const { setActiveEditor } = useCommentEditorContext()
  const [editor, localSetEditor] = useState<Editor | null>(null)
  const setEditor = (editor: Editor | null) => {
    localSetEditor(editor)
    propsSetEditor?.(editor)
  }

  const [putComment] =
    useMutation<PutArticleCommentMutation>(PUT_ARTICLE_COMMENT)
  const [isSubmitting, setSubmitting] = useState(false)

  const formStorageKey = formStorage.genArticleCommentKey({
    authorId: viewer.id,
    articleId,
    parentId,
    replyToId,
  })
  const formDraft = formStorage.get<string>(formStorageKey, 'local')
  const [content, setContent] = useState(
    (typeof formDraft === 'string' && formDraft.length > 0 && formDraft) ||
      defaultContent ||
      ''
  )
  const contentCount = stripHtml(content).length
  const isValid = contentCount > 0 && contentCount <= MAX_ARTICLE_COMMENT_LENGTH

  const handleSubmit = async (event?: React.FormEvent<HTMLFormElement>) => {
    const mentions = dom.getAttributes('data-id', content)
    const sanitizedContent = sanitizeContent(content)
    const input = {
      id: commentId,
      comment: {
        content: sanitizedContent,
        replyTo: replyToId,
        articleId,
        parentId,
        type: 'article',
        mentions,
      },
    }

    event?.preventDefault()
    setSubmitting(true)

    try {
      await putComment({
        variables: { input },
        update: (cache, mutationResult) => {
          sessionStorage.set(
            NEW_POST_COMMENT_MUTATION_RESULT,
            mutationResult.data?.putComment?.id || ''
          )
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

      onClear()

      // clear draft
      formStorage.remove<string>(formStorageKey, 'local')

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
      editor.commands.blur()
    }
    setActiveEditor(null)
  }

  const onUpdate = ({ content: newContent }: { content: string }) => {
    setContent(newContent)

    // save draft
    formStorage.set(formStorageKey, newContent, 'local')
  }

  // use event listener to handle form submit since pass handleSubmit directly will cache the old content value in the closure
  useEventListener(formStorageKey, () => {
    if (isSubmitting || !isValid) {
      return
    }

    handleSubmit()
  })

  const formClasses = classNames({
    [styles.form]: true,
    [styles.playAnimation]: playAnimation && !isHiding,
    [styles.hideAnimation]: isHiding,
  })

  return (
    <form
      className={formClasses}
      id={formStorageKey}
      onSubmit={handleSubmit}
      aria-label={intl.formatMessage({
        defaultMessage: 'Comment',
        id: 'bTNYGv',
        description: 'src/components/Forms/ArticleCommentForm/index.tsx',
      })}
      onClick={(event) => {
        if (!viewer.isAuthed) {
          event.preventDefault()
          window.dispatchEvent(
            new CustomEvent(OPEN_UNIVERSAL_AUTH_DIALOG, {
              detail: { trigger: UNIVERSAL_AUTH_TRIGGER.comment },
            })
          )
          return
        }
      }}
      onAnimationEnd={() => {
        if (isHiding && onHideComplete) {
          onHideComplete()
        }
      }}
    >
      <section className={styles.content}>
        <CommentEditor
          content={content}
          update={onUpdate}
          onSubmit={() => window.dispatchEvent(new CustomEvent(formStorageKey))}
          placeholder={placeholder}
          isFallbackEditor={isFallbackEditor}
          setEditor={(editor) => {
            setEditor(editor)
          }}
          editable={viewer.isAuthed}
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
            form={formStorageKey}
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
                  detail: { trigger: UNIVERSAL_AUTH_TRIGGER.comment },
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
