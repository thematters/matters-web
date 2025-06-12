import dynamic from 'next/dynamic'
import { useContext, useEffect, useRef, useState } from 'react'
import { FormattedMessage } from 'react-intl'

import {
  MAX_ARTICLE_COMMENT_LENGTH,
  NEW_POST_COMMENT_MUTATION_RESULT,
} from '~/common/enums'
import {
  analytics,
  dom,
  formStorage,
  sanitizeContent,
  sessionStorage,
  stripHtml,
} from '~/common/utils'
import {
  Dialog,
  SpinnerBlock,
  useEventListener,
  useMutation,
  ViewerContext,
} from '~/components'
import { PUT_ARTICLE_COMMENT } from '~/components/GQL/mutations/putComment'
import {
  updateArticleComments,
  updateCommentDetail,
} from '~/components/GQL/updates'
import { PutArticleCommentMutation } from '~/gql/graphql'

import styles from './styles.module.css'

const CommentEditor = dynamic(() => import('~/components/Editor/Comment'), {
  ssr: false,
  loading: () => <SpinnerBlock />,
})

export interface CommentFormProps {
  replyToId?: string
  parentId?: string
  articleId: string

  isInCommentDetail?: boolean

  defaultContent?: string | null
  submitCallback?: () => void
  closeDialog: () => void
  title?: React.ReactNode
  context?: React.ReactNode
}

const CommentForm: React.FC<CommentFormProps> = ({
  replyToId,
  parentId,
  articleId,

  isInCommentDetail,
  defaultContent,
  submitCallback,
  closeDialog,
  context,
}) => {
  const viewer = useContext(ViewerContext)
  const formRef = useRef<HTMLFormElement>(null)

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

    analytics.trackEvent('click_button', {
      type: 'article_comment_publish',
    })

    try {
      await putComment({
        variables: { input },
        update: (cache, mutationResult) => {
          const newComment = mutationResult.data?.putComment

          if (!newComment) {
            return
          }

          sessionStorage.set(NEW_POST_COMMENT_MUTATION_RESULT, newComment.id)

          if (!!parentId && !isInCommentDetail) {
            updateArticleComments({
              cache,
              articleId,
              commentId: parentId,
              type: 'addSecondaryComment',
              comment: newComment,
            })
          } else if (!!parentId && isInCommentDetail) {
            updateCommentDetail({
              cache,
              commentId: parentId || '',
              type: 'add',
              comment: newComment,
            })
          } else {
            updateArticleComments({
              cache,
              articleId,
              type: 'add',
              comment: newComment,
            })
          }
        },
      })

      setContent('')

      // clear draft
      formStorage.remove<string>(formStorageKey, 'local')

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

    // save draft
    formStorage.set(formStorageKey, newContent, 'local')
  }

  useEffect(() => {
    setTimeout(() => {
      if (formRef.current) {
        const editor = formRef.current.querySelector('.tiptap.ProseMirror')
        if (!editor) {
          return
        }

        // focus on end of the comment editor
        // ref: https://stackoverflow.com/a/69727327
        const sel = window.getSelection()
        sel?.selectAllChildren(editor)
        sel?.collapseToEnd()
      }
    }, 500)
  }, [])

  // use event listener to handle form submit since pass handleSubmit directly will cache the old content value in the closure
  useEventListener(formStorageKey, () => {
    if (isSubmitting || !isValid) {
      return
    }

    handleSubmit()
  })

  return (
    <>
      <Dialog.Header
        title=""
        closeDialog={closeDialog}
        leftBtn={
          <Dialog.RoundedButton
            disabled={isSubmitting}
            text={<FormattedMessage defaultMessage="Cancel" id="47FYwb" />}
            textSize={14}
            textWeight="normal"
            bgColor="white"
            color="black"
            borderWidth="sm"
            spacing={[0, 20]}
            size={[null, '1.875rem']}
            onClick={closeDialog}
          />
        }
        rightBtn={
          <>
            {contentCount > MAX_ARTICLE_COMMENT_LENGTH && (
              <span className={styles.count}>
                {contentCount}/{MAX_ARTICLE_COMMENT_LENGTH}
              </span>
            )}
            <Dialog.RoundedButton
              type="submit"
              form={formStorageKey}
              disabled={isSubmitting || !isValid}
              text={<FormattedMessage defaultMessage="Publish" id="syEQFE" />}
              textSize={14}
              textWeight="normal"
              bgColor="green"
              color="white"
              spacing={[0, 20]}
              size={[null, '1.875rem']}
            />
          </>
        }
      />

      <Dialog.Content fixedHeight className="dialog-editor">
        {context && <section className={styles.context}>{context}</section>}

        <form
          className={styles.form}
          id={formStorageKey}
          onSubmit={handleSubmit}
          ref={formRef}
        >
          <CommentEditor
            content={content}
            update={onUpdate}
            onSubmit={() =>
              window.dispatchEvent(new CustomEvent(formStorageKey))
            }
          />
        </form>
      </Dialog.Content>
    </>
  )
}

export default CommentForm
