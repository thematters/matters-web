import { Editor } from '@matters/matters-editor'
import { random } from 'lodash'
import { useCallback, useContext, useEffect, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import { ReactComponent as IconTimes } from '@/public/static/icons/24px/times.svg'
import {
  ADD_JOURNAL,
  MAX_JOURNAL_CONTENT_LENGTH,
  UPLOAD_JOURNAL_ASSET_COUNT_LIMIT,
} from '~/common/enums'
import { getImageDimensions, storage, stripHtml, toPath } from '~/common/utils'
import {
  Button,
  Icon,
  SpinnerBlock,
  TextIcon,
  useRoute,
  ViewerContext,
} from '~/components'
import JournalEditor from '~/components/Editor/Journal'
import {
  JournalAsset,
  JournalAssetsUploader,
} from '~/components/FileUploader/JournalAssetsUploader'
import { JournalDigestProps } from '~/components/JournalDigest'

import styles from './styles.module.css'

const KEY = 'user-journals'

const Edit = () => {
  const intl = useIntl()
  const viewer = useContext(ViewerContext)
  const { router } = useRoute()
  const [editor, setEditor] = useState<Editor | null>(null)

  const [assets, setAssets] = useState<JournalAsset[]>([])

  const addAssets = useCallback(
    async (files: File[]) => {
      // setEditing(true)
      const newFiles = Array.from(files).slice(
        0,
        UPLOAD_JOURNAL_ASSET_COUNT_LIMIT - assets.length
      )

      const newAssets = await Promise.all(
        newFiles.map(async (file) => {
          const { width, height } = await getImageDimensions(file)
          return {
            id: crypto.randomUUID(),
            file,
            uploaded: false,
            src: URL.createObjectURL(file),
            width,
            height,
          }
        })
      )

      setTimeout(() => {
        setAssets((prevAssets) => [...prevAssets, ...newAssets])
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
    } as JournalDigestProps

    const delay = random(1, 4, false) * 1000

    // mock submitting
    setTimeout(() => {
      window.dispatchEvent(
        new CustomEvent(ADD_JOURNAL, {
          detail: { input },
        })
      )
      addJournal(input)
      onClear()
      setSubmitting(false)
      goToUserProfile(input.id)
    }, delay)
  }

  const onClear = () => {
    setContent('')
    if (editor) {
      editor.commands.setContent('')
      editor.commands.blur()
    }
    setAssets([])
  }

  const onUpdate = ({ content: newContent }: { content: string }) => {
    setContent(newContent)
  }

  useEffect(() => {
    if (editor) {
      editor.commands.focus()
    }
  }, [editor])

  const goBack = () => {
    window.history.back()
  }

  const goToUserProfile = (id: string) => {
    const path = toPath({
      page: 'userProfile',
      userName: viewer.userName || '',
    })
    router.push(path.href + `#${id}`)
  }

  const addJournal = (journal: JournalDigestProps) => {
    const journals = storage.get(KEY) || []
    storage.set(KEY, [journal, ...(journals as JournalDigestProps[])])
  }

  return (
    <>
      <header className={styles.header}>
        <section className={styles.left}>
          <Button
            textColor="black"
            textActiveColor="greyDarker"
            onClick={goBack}
          >
            <Icon icon={IconTimes} size={24} />
          </Button>
          <span className={styles.title}>發動態</span>
        </section>
        <section className={styles.right}>
          <Button
            type="submit"
            form={formId}
            size={[null, '1.875rem']}
            spacing={[0, 12]}
            disabled={isSubmitting || !isValid}
            textColor="white"
            bgColor="green"
          >
            <TextIcon
              color="white"
              size={14}
              icon={isSubmitting && <SpinnerBlock size={14} noSpacing />}
            >
              {isSubmitting ? null : (
                <FormattedMessage defaultMessage="Publish" id="syEQFE" />
              )}
            </TextIcon>
          </Button>
        </section>
      </header>
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
              isInPage
            />
          </section>
        </footer>
      </form>
    </>
  )
}

export default Edit
