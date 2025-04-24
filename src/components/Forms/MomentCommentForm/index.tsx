import { Editor } from '@matters/matters-editor'
import classNames from 'classnames'
import gql from 'graphql-tag'
import { useContext, useEffect, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import {
  MAX_MOMENT_COMMENT_LENGTH,
  NEW_POST_COMMENT_MUTATION_RESULT,
  OPEN_UNIVERSAL_AUTH_DIALOG,
  UNIVERSAL_AUTH_TRIGGER,
  UPDATE_NEWEST_MOMENT_COMMENT,
} from '~/common/enums'
import {
  formStorage,
  sanitizeContent,
  sessionStorage,
  stripHtml,
} from '~/common/utils'
import {
  Button,
  SpinnerBlock,
  TextIcon,
  toast,
  useEventListener,
  useMutation,
  ViewerContext,
} from '~/components'
import CommentEditor from '~/components/Editor/Comment'
import { PUT_MOMENT_COMMENT } from '~/components/GQL/mutations/putComment'
import {
  MomentCommentFormMomentFragment,
  PutMomentCommentMutation,
} from '~/gql/graphql'

import styles from './styles.module.css'

const fragments = {
  moment: gql`
    fragment MomentCommentFormMoment on Moment {
      id
      shortHash
      author {
        id
        userName
      }
    }
  `,
}

export interface MomentCommentFormProps {
  moment: MomentCommentFormMomentFragment

  defaultContent?: string | null
  submitCallback?: () => void
  closeCallback?: () => void

  setEditor?: (editor: Editor | null) => void

  editing?: boolean
  setEditing?: (editing: boolean) => void
}

const MomentCommentForm = ({
  moment,
  defaultContent,
  submitCallback,
  closeCallback,

  setEditor: propsSetEditor,

  editing,
  setEditing,
}: MomentCommentFormProps) => {
  const { id: momentId } = moment
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

  const handleSubmit = async (event?: React.FormEvent<HTMLFormElement>) => {
    const sanitizedContent = sanitizeContent(content)
    const input = {
      comment: {
        content: sanitizedContent,
        momentId,
        type: 'moment',
      },
    }

    event?.preventDefault()
    setSubmitting(true)

    try {
      await putComment({
        variables: { input },
        update: (cache, mutationResult) => {
          const newComment = mutationResult.data?.putComment
          if (!newComment) {
            return
          }

          sessionStorage.set(NEW_POST_COMMENT_MUTATION_RESULT, newComment.id)

          cache.modify({
            id: cache.identify(moment),
            fields: {
              comments(existingComments) {
                const newCommentRef = cache.writeFragment({
                  data: newComment,
                  fragment: gql`
                    fragment NewComment on Comment {
                      id
                    }
                  `,
                })
                return {
                  ...existingComments,
                  edges: [...existingComments.edges, newCommentRef],
                }
              },
            },
          })

          toast.success({
            message: (
              <FormattedMessage
                defaultMessage="Published"
                description="src/components/Forms/MomentCommentForm/index.tsx"
                id="PB/iK6"
              />
            ),
          })

          window.dispatchEvent(
            new CustomEvent(UPDATE_NEWEST_MOMENT_COMMENT, {
              detail: { comment: newComment },
            })
          )
        },
      })

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
    [styles.default]: !editing,
  })

  const handleFocus = () => {
    if (!viewer.isAuthed) {
      window.dispatchEvent(
        new CustomEvent(OPEN_UNIVERSAL_AUTH_DIALOG, {
          detail: { trigger: UNIVERSAL_AUTH_TRIGGER.momentComment },
        })
      )
      return
    }
    setEditing?.(true)
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
      className={formClasses}
      id={formId}
      onSubmit={handleSubmit}
      aria-label={intl.formatMessage({
        defaultMessage: 'Comment',
        id: 'LgbKvU',
      })}
      onClick={handleFocus}
    >
      <section className={contentClasses}>
        <CommentEditor
          content={content}
          update={onUpdate}
          onSubmit={() => window.dispatchEvent(new CustomEvent(formStorageKey))}
          placeholder={intl.formatMessage({
            defaultMessage: 'Say something...',
            description: 'src/components/Forms/MomentCommentForm/index.tsx',
            id: 'b/mswY',
          })}
          setEditor={(editor) => {
            setEditor(editor)
          }}
          onFocused={handleFocus}
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

MomentCommentForm.fragments = fragments

export default MomentCommentForm
