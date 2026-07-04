import dynamic from 'next/dynamic'
import { useContext, useState } from 'react'
import { FormattedMessage } from 'react-intl'

import { COMMENT_TYPE_TEXT, MAX_CAMPAIGN_COMMENT_LENGTH } from '~/common/enums'
import { dom, formStorage, stripHtml } from '~/common/utils'
import {
  CircleCommentFormType,
  Dialog,
  LanguageContext,
  SpinnerBlock,
  toast,
  useEventListener,
  useMutation,
  ViewerContext,
} from '~/components'
import { PUT_CIRCLE_COMMENT } from '~/components/GQL/mutations/putComment'
import { PutCircleCommentMutation } from '~/gql/graphql'

import styles from './styles.module.css'

const CommentEditor = dynamic(() => import('~/components/Editor/Comment'), {
  ssr: false,
  loading: () => <SpinnerBlock />,
})

export interface CircleCommentFormProps {
  commentId?: string
  replyToId?: string
  parentId?: string
  // exactly one of circleId / campaignId is set, depending on `type`
  circleId?: string
  campaignId?: string
  type: CircleCommentFormType

  defaultContent?: string | null
  submitCallback?: () => void
  closeDialog: () => void
  title?: React.ReactNode
  context?: React.ReactNode
}

const CommentForm: React.FC<CircleCommentFormProps> = ({
  commentId,
  replyToId,
  parentId,
  circleId,
  campaignId,
  type,

  defaultContent,
  submitCallback,
  closeDialog,
  title = (
    <FormattedMessage
      defaultMessage="Comment"
      id="Ix3e3Q"
      description="src/components/Forms/CommentForm/index.tsx"
    />
  ),
  context,
}) => {
  const viewer = useContext(ViewerContext)
  const { lang } = useContext(LanguageContext)

  const [putComment] = useMutation<PutCircleCommentMutation>(PUT_CIRCLE_COMMENT)
  const [isSubmitting, setSubmitting] = useState(false)

  const formStorageKey = formStorage.genCircleCommentKey({
    authorId: viewer.id,
    circleId: circleId ?? campaignId ?? '',
    type,
    commentId,
    parentId,
    replyToId,
  })
  const formDraft = formStorage.get<string>(formStorageKey, 'local')
  const [content, setContent] = useState(
    (typeof formDraft === 'string' && formDraft.length > 0 && formDraft) ||
      defaultContent ||
      ''
  )
  // campaign discussion comments are capped at 240 chars (like 短動態)
  const maxLength =
    type === 'campaignDiscussion' ? MAX_CAMPAIGN_COMMENT_LENGTH : undefined
  const contentLength = stripHtml(content).length
  const isOverLength = maxLength !== undefined && contentLength > maxLength
  const isValid = contentLength > 0 && !isOverLength

  const handleSubmit = async (event?: React.FormEvent<HTMLFormElement>) => {
    const mentions = dom.getAttributes('data-id', content)

    const input = {
      id: commentId,
      comment: {
        content,
        replyTo: replyToId,
        circleId,
        campaignId,
        parentId,
        type,
        mentions,
      },
    }

    event?.preventDefault()
    setSubmitting(true)

    try {
      await putComment({ variables: { input } })

      setContent('')

      // clear draft
      formStorage.remove<string>(formStorageKey, 'local')

      toast.info({
        message: commentId ? (
          <FormattedMessage
            defaultMessage="{type} edited"
            id="AlHYvk"
            values={{ type: COMMENT_TYPE_TEXT[lang][type] }}
          />
        ) : (
          <FormattedMessage
            defaultMessage="{type} sent"
            id="aPxJXi"
            values={{ type: COMMENT_TYPE_TEXT[lang][type] }}
          />
        ),
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

  return (
    <>
      <Dialog.Header
        title={title}
        closeDialog={closeDialog}
        rightBtn={
          <Dialog.TextButton
            type="submit"
            form={formStorageKey}
            disabled={isSubmitting || !isValid}
            text={<FormattedMessage defaultMessage="Send" id="9WRlF4" />}
            loading={isSubmitting}
          />
        }
      />

      <Dialog.Content>
        {context && <section className={styles.context}>{context}</section>}

        <form
          className={styles.form}
          id={formStorageKey}
          onSubmit={handleSubmit}
        >
          <CommentEditor
            content={content}
            update={onUpdate}
            onSubmit={() =>
              window.dispatchEvent(new CustomEvent(formStorageKey))
            }
          />
          {maxLength !== undefined && (
            <p
              className={styles.counter}
              data-over={isOverLength ? 'true' : undefined}
            >
              {contentLength} / {maxLength}
            </p>
          )}
        </form>
      </Dialog.Content>

      <Dialog.Footer
        smUpBtns={
          <>
            <Dialog.TextButton
              text={<FormattedMessage defaultMessage="Cancel" id="47FYwb" />}
              color="greyDarker"
              onClick={closeDialog}
            />
            <Dialog.TextButton
              type="submit"
              form={formStorageKey}
              disabled={isSubmitting || !isValid}
              text={<FormattedMessage defaultMessage="Send" id="9WRlF4" />}
              loading={isSubmitting}
            />
          </>
        }
      />
    </>
  )
}

export default CommentForm
