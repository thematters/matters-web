import { Editor } from '@matters/matters-editor'
import classNames from 'classnames'
import { useContext, useEffect, useRef, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import { ReactComponent as IconImage } from '@/public/static/icons/24px/image.svg'
import {
  ADD_MOMENT_ASSETS,
  CLEAR_MOMENT_FORM,
  MAX_MOMENT_CONTENT_LENGTH,
  OPEN_MOMENT_FORM,
} from '~/common/enums'
import { formStorage, parseFormSubmitErrors, stripHtml } from '~/common/utils'
import {
  Button,
  ClearMomentDialog,
  Icon,
  SpinnerBlock,
  TextIcon,
  toast,
  useEventListener,
  useMutation,
  ViewerContext,
} from '~/components'
import MomentEditor from '~/components/Editor/Moment'
import { MomentAsset, MomentAssetsUploader } from '~/components/FileUploader'
import { updateUserWritings } from '~/components/GQL'
import { PUT_MOMENT } from '~/components/GQL/mutations/putMoment'
import { PutMomentMutation } from '~/gql/graphql'

import styles from './styles.module.css'

type FormDraft = {
  content?: string
  assets?: MomentAsset[]
}

const MomentForm = () => {
  const intl = useIntl()
  const viewer = useContext(ViewerContext)
  const [putMoment] = useMutation<PutMomentMutation>(PUT_MOMENT, undefined, {
    showToast: false,
  })

  const [isEditing, setEditing] = useState(false)

  useEventListener(OPEN_MOMENT_FORM, () => {
    setEditing(true)

    if (editor) {
      editor.commands.focus('end')
    }
  })

  const formRef = useRef<HTMLFormElement | null>(null)
  const formId = 'moment-form'
  const formStorageKey = formStorage.genKey({ formId, authorId: viewer.id })
  const formDraft = formStorage.get<FormDraft>(formStorageKey, 'local')
  const [isSubmitting, setSubmitting] = useState(false)
  const [editor, setEditor] = useState<Editor | null>(null)
  const [content, setContent] = useState(formDraft?.content || '')
  const [assets, setAssets] = useState<MomentAsset[]>(formDraft?.assets || [])
  const [isDragging, setIsDragging] = useState(false)
  const updateAssets = (assets: MomentAsset[]) => {
    formStorage.set<FormDraft>(
      formStorageKey,
      { ...formDraft, assets },
      'local'
    )
    setAssets(assets)
  }

  const contentCount = stripHtml(content).length

  const isValid =
    (contentCount > 0 || assets.length > 0) &&
    contentCount <= MAX_MOMENT_CONTENT_LENGTH &&
    assets.every(({ uploaded }) => uploaded)

  const showClearButton = contentCount > 0 || assets.length > 0

  useEffect(() => {
    const clickOutside = (event: MouseEvent) => {
      if (
        formRef.current &&
        !formRef.current.contains(event.target as Node) &&
        isEditing &&
        assets.length === 0 &&
        stripHtml(content).length === 0
      ) {
        setEditing(false)
      }
    }

    document.addEventListener('click', clickOutside)

    return () => {
      document.removeEventListener('click', clickOutside)
    }
  }, [isEditing, assets, content])

  const handleDragEnter = (event: React.DragEvent<HTMLFormElement>) => {
    event.preventDefault()
    event.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (event: React.DragEvent<HTMLFormElement>) => {
    event.preventDefault()
    event.stopPropagation()
    const rect = formRef.current?.getBoundingClientRect()
    if (!rect) {
      return
    }
    if (
      event.clientY < rect.top ||
      event.clientY >= rect.bottom ||
      event.clientX < rect.left ||
      event.clientX >= rect.right
    ) {
      //real leave
      setIsDragging(false)
    }
  }

  const handleDragOver = (event: React.DragEvent<HTMLFormElement>) => {
    event.preventDefault()
    event.stopPropagation()
  }

  const handleDrop = (event: React.DragEvent<HTMLFormElement>) => {
    event.preventDefault()
    event.stopPropagation()
    setIsDragging(false)

    const files = event.dataTransfer.files
    if (files.length > 0) {
      window.dispatchEvent(
        new CustomEvent(ADD_MOMENT_ASSETS, {
          detail: { files: files },
        })
      )
    }
  }

  useEventListener(ADD_MOMENT_ASSETS, () => {
    setIsDragging(false)
  })
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      setSubmitting(true)
      const { USER_PROFILE_PUBLIC } = require('~/views/User/UserProfile/gql')
      const { data } = await putMoment({
        variables: {
          input: {
            content,
            assets: assets.map(({ assetId }) => assetId),
          },
        },
        update: (cache, mutationResult) => {
          updateUserWritings({
            cache,
            type: 'addMoment',
            userName: viewer.userName || '',
            momentDigest: mutationResult.data?.putMoment,
          })
        },
        refetchQueries: [
          {
            query: USER_PROFILE_PUBLIC,
            variables: { userName: viewer.userName },
          },
        ],
      })

      const { putMoment: moment } = data || {}
      if (!moment) {
        setSubmitting(false)
        return
      }

      setSubmitting(false)
      onClear()
      setEditing(false)

      // Clear other rendered moment forms
      window.dispatchEvent(new CustomEvent(CLEAR_MOMENT_FORM))
    } catch (error) {
      setSubmitting(false)
      const [, codes] = parseFormSubmitErrors(error as any)
      codes.forEach((code) => {
        if (code === 'ACTION_LIMIT_EXCEEDED') {
          toast.success({
            message: intl.formatMessage({
              defaultMessage:
                'You’ve posted several times in a short period. Please take a break.',
              id: 'IpMWC4',
            }),
          })
        }
      })
    }
  }

  const onClear = () => {
    setContent('')
    if (editor) {
      editor.commands.setContent('')
      editor.commands.blur()
    }
    setAssets([])
    formStorage.remove(formStorageKey, 'local')
  }

  const onUpdate = ({ content: newContent }: { content: string }) => {
    formStorage.set<FormDraft>(
      formStorageKey,
      { ...formDraft, content: newContent },
      'local'
    )
    setContent(newContent)
  }

  useEventListener(CLEAR_MOMENT_FORM, () => {
    onClear()
  })

  useEffect(() => {
    if (editor && isEditing) {
      editor.commands.focus('end')
    }
  }, [editor, isEditing, content])

  if (!isEditing) {
    return (
      <section className={styles.defalut} onClick={() => setEditing(true)}>
        <div className={styles.imageButton}>
          <Icon icon={IconImage} size={22} color="greyDarker" />
        </div>
        <button className={styles.activeButton}>
          <FormattedMessage defaultMessage="Say something..." id="YoiwCD" />
        </button>
      </section>
    )
  }

  const countClasses = classNames({
    [styles.count]: true,
    [styles.over]: contentCount > MAX_MOMENT_CONTENT_LENGTH,
  })

  const formClasses = classNames({
    [styles.form]: true,
    [styles.dragging]: isDragging,
  })

  return (
    <form
      ref={formRef}
      className={formClasses}
      id={formId}
      onSubmit={handleSubmit}
      aria-label={intl.formatMessage({
        defaultMessage: 'Moment',
        id: 'E3uFyt',
        description: 'src/components/Forms/MomentForm/index.tsx',
      })}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <section className={styles.content}>
        <MomentEditor
          content={content}
          update={onUpdate}
          setEditor={(editor) => {
            setEditor(editor)
          }}
        />
      </section>

      <footer className={styles.footer}>
        <section>
          <MomentAssetsUploader assets={assets} updateAssets={updateAssets} />
        </section>
        <section className={styles.right}>
          <span className={countClasses}>
            {contentCount}/{MAX_MOMENT_CONTENT_LENGTH}
          </span>
          <div className={styles.line} />
          {showClearButton && (
            <ClearMomentDialog onConfirm={onClear}>
              {({ openDialog }) => (
                <Button
                  size={[null, '2rem']}
                  spacing={[0, 16]}
                  bgColor="white"
                  disabled={isSubmitting}
                  onClick={openDialog}
                  textColor="black"
                  textActiveColor="greyDarker"
                >
                  <TextIcon size={14}>
                    <FormattedMessage defaultMessage="Clear" id="/GCoTA" />
                  </TextIcon>
                </Button>
              )}
            </ClearMomentDialog>
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
        </section>
      </footer>
    </form>
  )
}

export default MomentForm
