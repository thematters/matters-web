import { Editor } from '@matters/matters-editor'
import { random } from 'lodash'
import { useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import { ADD_JOURNAL_COMMENT, MAX_JOURNAL_COMMENT_LENGTH } from '~/common/enums'
import { stripHtml, trimCommentContent } from '~/common/utils'
import { Button, SpinnerBlock, TextIcon } from '~/components'
import CommentEditor from '~/components/Editor/Comment'

import styles from './styles.module.css'

export type JournalCommentFormType = 'journal'

export interface JournalCommentFormProps {
  type: JournalCommentFormType

  journalId?: string

  defaultContent?: string | null
  submitCallback?: () => void
  closeCallback?: () => void

  setEditor?: (editor: Editor | null) => void
}

export const JournalCommentForm: React.FC<JournalCommentFormProps> = ({
  journalId,
  type,
  defaultContent,
  submitCallback,
  closeCallback,

  setEditor: propsSetEditor,
}) => {
  const intl = useIntl()
  const [editor, localSetEditor] = useState<Editor | null>(null)
  const setEditor = (editor: Editor | null) => {
    localSetEditor(editor)
    propsSetEditor?.(editor)
  }

  // retrieve comment draft
  const commentDraftId = `${journalId}-${type}-comment`
  const formId = `journal-comment-form-${commentDraftId}`

  const [isSubmitting, setSubmitting] = useState(false)
  const [content, setContent] = useState(defaultContent || '')

  const contentCount = stripHtml(content).length

  const isValid = contentCount > 0 && contentCount <= MAX_JOURNAL_COMMENT_LENGTH

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const trimContent = trimCommentContent(content)
    const input = {
      id: crypto.randomUUID(),
      content: trimContent,
      createdAt: new Date().toISOString(),
      type,
    }

    event.preventDefault()
    setSubmitting(true)

    const delay = random(1, 2, false) * 1000

    // mock submitting
    setTimeout(() => {
      window.dispatchEvent(
        new CustomEvent(ADD_JOURNAL_COMMENT, {
          detail: { input },
        })
      )
      onClear()

      if (submitCallback) {
        submitCallback()
      }
      setSubmitting(false)
    }, delay)
  }

  const onClear = () => {
    setContent('')
    if (editor) {
      editor.commands.setContent('')
      editor.commands.blur()
    }
  }

  const onUpdate = ({ content: newContent }: { content: string }) => {
    setContent(newContent)
  }

  return (
    <form
      className={styles.form}
      id={formId}
      onSubmit={handleSubmit}
      aria-label={intl.formatMessage({
        defaultMessage: 'Comment',
        id: 'LgbKvU',
      })}
    >
      <section className={styles.content}>
        <CommentEditor
          content={content}
          update={onUpdate}
          placeholder={intl.formatMessage({
            defaultMessage: '說點什麼...',
            id: 'EIoAY7',
          })}
          setEditor={(editor) => {
            setEditor(editor)
          }}
        />
      </section>

      <footer className={styles.footer}>
        {contentCount > MAX_JOURNAL_COMMENT_LENGTH && (
          <span className={styles.count}>
            {contentCount}/{MAX_JOURNAL_COMMENT_LENGTH}
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
      </footer>
    </form>
  )
}
