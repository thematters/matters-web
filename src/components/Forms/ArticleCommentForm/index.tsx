import { Editor } from '@matters/matters-editor'
import { useContext, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import {
  MAX_ARTICLE_COMMENT_LENGTH,
  OPEN_UNIVERSAL_AUTH_DIALOG,
  UNIVERSAL_AUTH_TRIGGER,
} from '~/common/enums'
import { dom, formStorage, stripHtml, trimCommentContent } from '~/common/utils'
import {
  Button,
  SpinnerBlock,
  TextIcon,
  useCommentEditorContext,
  useEventListener,
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

  isFallbackEditor?: boolean
  setEditor?: (editor: Editor | null) => void
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
  setEditor: propsSetEditor,
}) => {
  const intl = useIntl()
  const viewer = useContext(ViewerContext)
  const { getQuery, routerLang } = useRoute()
  const { setActiveEditor } = useCommentEditorContext()
  const [editor, localSetEditor] = useState<Editor | null>(null)
  const setEditor = (editor: Editor | null) => {
    localSetEditor(editor)
    propsSetEditor?.(editor)
  }
  const shortHash = getQuery('shortHash')

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
    const trimContent = trimCommentContent(content)
    const input = {
      id: commentId,
      comment: {
        content: trimContent,
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
    console.log('clear', editor)
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
  useEventListener(formStorageKey, handleSubmit)

  return (
    <form
      className={styles.form}
      id={formStorageKey}
      onSubmit={handleSubmit}
      aria-label={intl.formatMessage({
        defaultMessage: 'Comment',
        id: 'bTNYGv',
        description: 'src/components/Forms/ArticleCommentForm/index.tsx',
      })}
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
