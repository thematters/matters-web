import { Editor } from '@matters/matters-editor'
import dynamic from 'next/dynamic'
import { useContext, useState } from 'react'
import { useIntl } from 'react-intl'

import { dom, formStorage, stripHtml } from '~/common/utils'
import {
  Button,
  Spinner,
  SpinnerBlock,
  TextIcon,
  Translate,
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

export type CircleCommentFormType = 'circleDiscussion' | 'circleBroadcast'

export interface CircleCommentFormProps {
  commentId?: string
  replyToId?: string
  parentId?: string
  circleId: string
  type: CircleCommentFormType

  defaultContent?: string | null
  submitCallback?: () => void

  placeholder?: string
}

export const CircleCommentForm: React.FC<CircleCommentFormProps> = ({
  commentId,
  replyToId,
  parentId,
  circleId,
  type,

  defaultContent,
  submitCallback,

  placeholder,
}) => {
  const viewer = useContext(ViewerContext)
  const intl = useIntl()

  const [editor, localSetEditor] = useState<Editor | null>(null)
  const setEditor = (editor: Editor | null) => {
    localSetEditor(editor)
  }

  const [putComment] = useMutation<PutCircleCommentMutation>(PUT_CIRCLE_COMMENT)
  const [isSubmitting, setSubmitting] = useState(false)

  const formStorageKey = formStorage.genCircleCommentKey({
    authorId: viewer.id,
    circleId,
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
  const isValid = stripHtml(content).length > 0

  const handleSubmit = async (event?: React.FormEvent<HTMLFormElement>) => {
    const mentions = dom.getAttributes('data-id', content)
    const input = {
      id: commentId,
      comment: {
        content,
        replyTo: replyToId,
        circleId,
        parentId,
        type,
        mentions,
      },
    }

    event?.preventDefault()
    setSubmitting(true)

    try {
      await putComment({ variables: { input } })

      setSubmitting(false)

      if (submitCallback) {
        submitCallback()
      }

      // clear content
      setContent('')

      if (editor) {
        editor.commands.setContent('')
        editor.commands.blur()
      }

      // clear draft
      formStorage.remove<string>(formStorageKey, 'local')
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
    <form
      className={styles.form}
      id={formStorageKey}
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
          onSubmit={() => window.dispatchEvent(new CustomEvent(formStorageKey))}
          placeholder={placeholder}
          setEditor={(editor) => {
            setEditor(editor)
          }}
        />
      </section>

      <footer className={styles.footer}>
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
