import { Editor } from '@matters/matters-editor'
import classNames from 'classnames'
import { useContext, useEffect, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import { MAX_MOMENT_COMMENT_LENGTH } from '~/common/enums'
import { formStorage, stripHtml, trimCommentContent } from '~/common/utils'
import {
  Button,
  SpinnerBlock,
  TextIcon,
  useMutation,
  ViewerContext,
} from '~/components'
import CommentEditor from '~/components/Editor/Comment'
import { PUT_MOMENT_COMMENT } from '~/components/GQL/mutations/putComment'
import { PutMomentCommentMutation } from '~/gql/graphql'

import styles from './styles.module.css'

export interface MomentCommentFormProps {
  momentId?: string

  defaultContent?: string | null
  submitCallback?: () => void
  closeCallback?: () => void

  setEditor?: (editor: Editor | null) => void

  editing?: boolean
  setEditing?: (editing: boolean) => void
}

export const MomentCommentForm: React.FC<MomentCommentFormProps> = ({
  momentId,
  defaultContent,
  submitCallback,
  closeCallback,

  setEditor: propsSetEditor,

  editing,
  setEditing,
}) => {
  const intl = useIntl()
  const viewer = useContext(ViewerContext)
  const [editor, localSetEditor] = useState<Editor | null>(null)
  const setEditor = (editor: Editor | null) => {
    localSetEditor(editor)
    propsSetEditor?.(editor)
  }

  const formId = `moment-comment-form-${momentId}`

  const [putComment] = useMutation<PutMomentCommentMutation>(PUT_MOMENT_COMMENT)
  const [isSubmitting, setSubmitting] = useState(false)
  const formStorageKey = formStorage.genKey({
    authorId: viewer.id,
    formId,
  })

  const [content, setContent] = useState(defaultContent || '')

  useEffect(() => {
    if (!editor) {
      return
    }
    let draftContent = ''
    if (editing) {
      const formDraft = formStorage.get<string>(formStorageKey, 'local')
      draftContent =
        (typeof formDraft === 'string' && formDraft.length > 0 && formDraft) ||
        ''
    }
    setContent(draftContent)
    editor.commands.setContent(draftContent)
  }, [editor, editing])

  const contentCount = stripHtml(content).length

  const isValid = contentCount > 0 && contentCount <= MAX_MOMENT_COMMENT_LENGTH

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const trimContent = trimCommentContent(content)
    const input = {
      comment: {
        content: trimContent,
        momentId,
        type: 'moment',
      },
    }

    event.preventDefault()
    setSubmitting(true)

    try {
      await putComment({ variables: { input } })

      setSubmitting(false)
      submitCallback?.()

      onClear()
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
    // clear draft
    formStorage.remove<string>(formStorageKey, 'local')
  }

  const onUpdate = ({ content: newContent }: { content: string }) => {
    setContent(newContent)

    // save draft
    formStorage.set(formStorageKey, newContent, 'local')
  }

  const formClasses = classNames({
    [styles.form]: true,
    [styles.focus]: editing,
  })

  const contentClasses = classNames({
    [styles.content]: true,
    [styles.focus]: editing,
  })

  return (
    <form
      className={formClasses}
      id={formId}
      onSubmit={handleSubmit}
      aria-label={intl.formatMessage({
        defaultMessage: 'Comment',
        id: 'LgbKvU',
      })}
      onClick={() => setEditing?.(true)}
      // onFocus={() => setEditing?.(true)}
    >
      <section className={contentClasses}>
        <CommentEditor
          content={content}
          update={onUpdate}
          placeholder={intl.formatMessage({
            defaultMessage: 'Say something...',
            id: 'YoiwCD',
          })}
          setEditor={(editor) => {
            setEditor(editor)
          }}
          lockScroll={false}
        />
      </section>

      {editing && (
        <footer className={styles.footer}>
          {contentCount > MAX_MOMENT_COMMENT_LENGTH && (
            <span className={styles.count}>
              {contentCount}/{MAX_MOMENT_COMMENT_LENGTH}
            </span>
          )}
          {!!closeCallback && (
            <Button
              size={[null, '2rem']}
              spacing={[0, 16]}
              bgColor="white"
              disabled={isSubmitting}
              onClick={(e) => {
                e?.preventDefault()
                e?.stopPropagation()
                closeCallback()
              }}
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
      )}
    </form>
  )
}
