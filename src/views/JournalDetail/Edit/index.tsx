import { Editor } from '@matters/matters-editor'
import { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'

import JournalEditor from '~/components/Editor/Journal'

import styles from './styles.module.css'

const Edit = () => {
  const intl = useIntl()
  const [editor, setEditor] = useState<Editor | null>(null)
  const [content, setContent] = useState('')
  const formId = `journal-form`

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {}

  const onUpdate = ({ content: newContent }: { content: string }) => {
    setContent(newContent)
  }

  useEffect(() => {
    if (editor) {
      setTimeout(() => {
        editor.commands.focus('end')
      }, 1 * 1000)
    }
  }, [editor])

  return (
    <>
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

        {/* <footer className={styles.footer}>
          <section>
            <JournalAssetsUploader
              assets={assets}
              addAssets={addAssets}
              removeAsset={removeAsset}
              isEditing
            />
          </section>
        </footer> */}
      </form>
    </>
  )
}

export default Edit
