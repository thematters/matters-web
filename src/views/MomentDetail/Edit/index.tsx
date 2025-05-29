import { ApolloError } from '@apollo/client'
import { Editor } from '@matters/matters-editor'
import classNames from 'classnames'
import { useContext, useEffect, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import IconTimes from '@/public/static/icons/24px/times.svg'
import { CLEAR_MOMENT_FORM, MAX_MOMENT_CONTENT_LENGTH } from '~/common/enums'
import {
  formStorage,
  parseFormSubmitErrors,
  sanitizeContent,
  stripHtml,
  toPath,
} from '~/common/utils'
import {
  Button,
  ClearMomentDialog,
  Icon,
  SpinnerBlock,
  TextIcon,
  toast,
  useEventListener,
  useMutation,
  useRoute,
  ViewerContext,
} from '~/components'
import MomentEditor from '~/components/Editor/Moment'
import { MomentAsset, MomentAssetsUploader } from '~/components/FileUploader'
import { PUT_MOMENT } from '~/components/GQL/mutations/putMoment'
import { PutMomentMutation } from '~/gql/graphql'

import styles from './styles.module.css'

type FormDraft = {
  content?: string
  assets?: MomentAsset[]
}

const Edit = () => {
  const intl = useIntl()
  const viewer = useContext(ViewerContext)
  const { router } = useRoute()
  const [putMoment] = useMutation<PutMomentMutation>(PUT_MOMENT, undefined, {
    showToast: false,
  })

  const formId = 'moment-form'
  const formStorageKey = formStorage.genKey({ formId, authorId: viewer.id })
  const formDraft = formStorage.get<FormDraft>(formStorageKey, 'local')

  const [isSubmitting, setSubmitting] = useState(false)
  const [editor, setEditor] = useState<Editor | null>(null)
  const [content, setContent] = useState(formDraft?.content || '')
  const [assets, setAssets] = useState<MomentAsset[]>(formDraft?.assets || [])

  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

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
    ((contentCount > 0 && contentCount <= MAX_MOMENT_CONTENT_LENGTH) ||
      assets.length > 0) &&
    assets.every(({ uploaded }) => uploaded)

  const handleSubmit = async (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault()

    try {
      setSubmitting(true)
      const { data } = await putMoment({
        variables: {
          input: {
            content: sanitizeContent(content),
            assets: assets.map(({ assetId }) => assetId),
          },
        },
        update: (cache) => {
          cache.evict({ id: cache.identify(viewer), fieldName: 'writings' })
          cache.gc()
        },
      })

      const { putMoment: moment } = data || {}
      if (!moment) {
        setSubmitting(false)
        return
      }

      setSubmitting(false)
      onClear()

      goToUserProfile(moment.shortHash)

      toast.success({
        message: intl.formatMessage({
          defaultMessage: 'Published',
          description: 'src/views/MomentDetail/Edit/index.tsx',
          id: 'ng6TX/',
        }),
      })

      // Clear other rendered moment forms
      window.dispatchEvent(new CustomEvent(CLEAR_MOMENT_FORM))
    } catch (error) {
      setSubmitting(false)
      const [, codes] = parseFormSubmitErrors(error as ApolloError)
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

  useEventListener(CLEAR_MOMENT_FORM, () => {
    onClear()
  })

  useEffect(() => {
    if (editor) {
      editor.commands.focus('end')
    }
  }, [editor])

  const onUpdate = ({ content: newContent }: { content: string }) => {
    formStorage.set<FormDraft>(
      formStorageKey,
      { ...formDraft, content: newContent },
      'local'
    )
    setContent(newContent)
  }

  const goBack = () => {
    window.history.back()
  }

  const goToUserProfile = (shortHash: string) => {
    const path = toPath({
      page: 'userProfile',
      userName: viewer.userName || '',
    })
    router.push(`${path.href}#${shortHash}`)
  }

  const countClass = classNames({
    [styles.count]: true,
    [styles.over]: contentCount > MAX_MOMENT_CONTENT_LENGTH,
  })

  // use event listener to handle form submit since pass handleSubmit directly will cache the old content value in the closure
  useEventListener(formStorageKey, () => {
    if (isSubmitting || !isValid) {
      return
    }

    handleSubmit()
  })

  // FIXED: Text content does not match server-rendered HTML
  // https://nextjs.org/docs/messages/react-hydration-error
  if (!isClient) {
    return null
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
          <span className={styles.title}>
            <FormattedMessage
              defaultMessage="Moment"
              description="src/views/MomentDetail/Edit/index.tsx"
              id="34OLoD"
            />
          </span>
        </section>
        <section className={styles.right}>
          {isValid && (
            <ClearMomentDialog onConfirm={onClear}>
              {({ openDialog }) => (
                <Button
                  size={[null, '1.875rem']}
                  spacing={[0, 20]}
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
            size={[null, '1.875rem']}
            spacing={[0, 20]}
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
                <FormattedMessage
                  defaultMessage="Post"
                  id="AtjJEA"
                  description="src/views/MomentDetail/Edit/index.tsx"
                />
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
          defaultMessage: 'Moment',
          id: '34OLoD',
          description: 'src/views/MomentDetail/Edit/index.tsx',
        })}
      >
        <section className={styles.content}>
          <MomentEditor
            content={content}
            update={onUpdate}
            onSubmit={() =>
              window.dispatchEvent(new CustomEvent(formStorageKey))
            }
            setEditor={(editor) => {
              setEditor(editor)
            }}
          />
        </section>

        <footer className={styles.footer}>
          <section>
            <MomentAssetsUploader
              assets={assets}
              updateAssets={updateAssets}
              isInPage
            />
          </section>
          <span className={countClass}>
            {contentCount}/{MAX_MOMENT_CONTENT_LENGTH}
          </span>
        </footer>
      </form>
    </>
  )
}

export default Edit
