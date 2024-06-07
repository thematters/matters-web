import { Editor } from '@matters/matters-editor'
import { random } from 'lodash'
import { useCallback, useEffect, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import {
  ADD_JOURNAL,
  MAX_JOURNAL_CONTENT_LENGTH,
  UPLOAD_JOURNAL_ASSET_COUNT_LIMIT,
} from '~/common/enums'
import { stripHtml } from '~/common/utils'
import { Button, SpinnerBlock, TextIcon } from '~/components'
import JournalEditor from '~/components/Editor/Journal'
import {
  JournalAsset,
  JournalAssetsUploader,
} from '~/components/FileUploader/JournalAssetsUploader'

import styles from './styles.module.css'

export interface JournalFormProps {}

export const JournalForm: React.FC<JournalFormProps> = ({}) => {
  const intl = useIntl()
  const [isEditing, setEditing] = useState(false)
  const [editor, setEditor] = useState<Editor | null>(null)
  const [assets, setAssets] = useState<JournalAsset[]>([])

  const addAssets = useCallback(
    (files: File[]) => {
      setEditing(true)
      const newFiles = Array.from(files).slice(
        0,
        UPLOAD_JOURNAL_ASSET_COUNT_LIMIT - assets.length
      )

      setTimeout(() => {
        setAssets([
          ...assets,
          ...newFiles.map((file) => ({
            id: crypto.randomUUID(),
            file,
            uploaded: false,
            src: URL.createObjectURL(file),
          })),
        ])
      }, 500)
    },
    [assets]
  )

  const removeAsset = useCallback(
    (asset: JournalAsset) => {
      URL.revokeObjectURL(asset.src)
      setAssets(assets.filter((a) => a.id !== asset.id))
    },
    [assets]
  )

  const formId = `journal-form`

  const [isSubmitting, setSubmitting] = useState(false)
  const [content, setContent] = useState('')

  const contentCount = stripHtml(content).length

  const isValid =
    (contentCount > 0 && contentCount <= MAX_JOURNAL_CONTENT_LENGTH) ||
    assets.length > 0

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitting(true)

    const input = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      content,
      assets: assets,
    }

    const delay = random(1, 5, false) * 1000

    // mock submitting
    setTimeout(() => {
      window.dispatchEvent(
        new CustomEvent(ADD_JOURNAL, {
          detail: { input },
        })
      )
      onClear()
      setSubmitting(false)
    }, delay)
  }

  const onClear = () => {
    setContent('')
    if (editor) {
      editor.commands.setContent('')
      editor.commands.blur()
    }
    setAssets([])
    setEditing(false)
  }

  const onUpdate = ({ content: newContent }: { content: string }) => {
    setContent(newContent)
  }

  useEffect(() => {
    if (editor && isEditing) {
      editor.commands.focus('end')
    }
  }, [editor, isEditing])

  if (!isEditing) {
    return (
      <section className={styles.defalut}>
        <JournalAssetsUploader
          assets={assets}
          addAssets={addAssets}
          removeAsset={removeAsset}
        />
        <button
          onClick={() => setEditing(true)}
          className={styles.activeButton}
        >
          <FormattedMessage defaultMessage="說點什麼..." id="EIoAY7" />
        </button>
      </section>
    )
  }

  return (
    <form
      className={styles.form}
      id={formId}
      onSubmit={handleSubmit}
      aria-label={intl.formatMessage({
        defaultMessage: 'Journal',
        id: 'nJaVYb',
        description: 'src/components/Forms/JournalForm/index.tsx',
      })}
    >
      <section className={styles.content}>
        <JournalEditor
          content={content}
          update={onUpdate}
          // placeholder={placeholder}
          setEditor={(editor) => {
            setEditor(editor)
          }}
        />
      </section>

      <footer className={styles.footer}>
        <section>
          <JournalAssetsUploader
            assets={assets}
            addAssets={addAssets}
            removeAsset={removeAsset}
            isEditing
          />
        </section>
        <section>
          {contentCount > MAX_JOURNAL_CONTENT_LENGTH && (
            <span className={styles.count}>
              {contentCount}/{MAX_JOURNAL_CONTENT_LENGTH}
            </span>
          )}
          <Button
            size={[null, '2rem']}
            spacing={[0, 16]}
            bgColor="white"
            disabled={isSubmitting}
            onClick={() => setEditing(false)}
            textColor="black"
            textActiveColor="greyDarker"
          >
            <TextIcon size={14}>
              <FormattedMessage defaultMessage="Cancel" id="47FYwb" />
            </TextIcon>
          </Button>
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
        </section>
      </footer>
    </form>
  )
}
