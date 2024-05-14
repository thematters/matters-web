import { useQuery } from '@apollo/react-hooks'
import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'
import { FormattedMessage } from 'react-intl'

import { MAX_ARTICLE_COMMENT_LENGTH } from '~/common/enums'
import { dom, stripHtml, trimCommentContent } from '~/common/utils'
import {
  CommentFormType,
  Dialog,
  SpinnerBlock,
  useMutation,
  useRoute,
} from '~/components'
import PUT_COMMENT_BETA from '~/components/GQL/mutations/putCommentBeta'
import COMMENT_DRAFT from '~/components/GQL/queries/commentDraft'
import {
  updateArticleComments,
  updateArticlePublic,
  updateCommentDetail,
} from '~/components/GQL/updates'
import { CommentDraftQuery, PutCommentBetaMutation } from '~/gql/graphql'

import styles from './styles.module.css'

const CommentEditor = dynamic(() => import('~/components/Editor/Comment'), {
  ssr: false,
  loading: () => <SpinnerBlock />,
})

export interface CommentFormProps {
  commentId?: string
  replyToId?: string
  parentId?: string
  circleId?: string
  articleId?: string
  type: CommentFormType

  isInCommentDetail?: boolean

  defaultContent?: string | null
  submitCallback?: () => void
  closeDialog: () => void
  title?: React.ReactNode
  context?: React.ReactNode
}

const CommentForm: React.FC<CommentFormProps> = ({
  commentId,
  replyToId,
  parentId,
  articleId,
  circleId,
  type,

  isInCommentDetail,
  defaultContent,
  submitCallback,
  closeDialog,
  title,
  context,

  ...props
}) => {
  // retrieve comment draft
  const commentDraftId = `${articleId || circleId}:${commentId || 0}:${
    parentId || 0
  }:${replyToId || 0}`
  const formId = `comment-form-${commentDraftId}`
  const formRef = useRef<HTMLFormElement>(null)
  const { getQuery, routerLang } = useRoute()
  const shortHash = getQuery('shortHash')

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
    const trimContent = trimCommentContent(content)
    const input = {
      id: commentId,
      comment: {
        content: trimContent,
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

  useEffect(() => {
    setTimeout(() => {
      if (formRef.current) {
        const editor = formRef.current.querySelector('.tiptap.ProseMirror')
        if (!editor) {
          return
        }

        // focus on end of the comment editor
        // ref: https://stackoverflow.com/a/69727327
        let sel = window.getSelection()
        sel?.selectAllChildren(editor)
        sel?.collapseToEnd()
      }
    }, 500)
  }, [])

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
              form={formId}
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

      <Dialog.Content fixedHeight>
        {context && <section className={styles.context}>{context}</section>}

        <form
          className={styles.form}
          id={formId}
          onSubmit={handleSubmit}
          ref={formRef}
        >
          <CommentEditor content={content} update={onUpdate} />
        </form>
      </Dialog.Content>
    </>
  )
}

export default CommentForm
