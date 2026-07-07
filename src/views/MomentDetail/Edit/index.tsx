import { ApolloError } from '@apollo/client'
import { Editor } from '@matters/matters-editor'
import classNames from 'classnames'
import { useContext, useEffect, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import IconHashTag from '@/public/static/icons/24px/hashtag.svg'
import IconImage from '@/public/static/icons/24px/image.svg'
import IconTimes from '@/public/static/icons/24px/times.svg'
import {
  CLEAR_MOMENT_FORM,
  MAX_MOMENT_CONTENT_LENGTH,
  UPLOAD_MOMENT_ASSET_COUNT_LIMIT,
} from '~/common/enums'
import { MOMENT_TAGS_MAX_COUNT } from '~/common/enums/moment'
import {
  formStorage,
  normalizeTag,
  parseFormSubmitErrors,
  sanitizeContent,
  stripHtml,
  toPath,
} from '~/common/utils'
import {
  Button,
  ClearMomentDialog,
  Icon,
  InlineTag,
  SpinnerBlock,
  TextIcon,
  toast,
  toDigestTagPlaceholder,
  useEventListener,
  useFeatures,
  useMutation,
  useRoute,
  ViewerContext,
} from '~/components'
import MomentEditor from '~/components/Editor/Moment'
import TagInput from '~/components/Editor/Sidebar/Tags/TagInput'
import {
  getStorableMomentAssets,
  MomentAsset,
  MomentAssetsUploader,
} from '~/components/FileUploader'
import { PUT_MOMENT } from '~/components/GQL/mutations/putMoment'
import { PutMomentMutation } from '~/gql/graphql'

import styles from './styles.module.css'

type FormDraft = {
  content?: string
  assets?: MomentAsset[]
  tags?: string[]
}

const Edit = () => {
  const intl = useIntl()
  const viewer = useContext(ViewerContext)
  const features = useFeatures()
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
  const [assets, setAssets] = useState<MomentAsset[]>(
    getStorableMomentAssets(formDraft?.assets)
  )

  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const updateAssets = (assets: MomentAsset[]) => {
    const currentDraft = formStorage.get<FormDraft>(formStorageKey, 'local')
    formStorage.set<FormDraft>(
      formStorageKey,
      { ...currentDraft, assets: getStorableMomentAssets(assets) },
      'local'
    )
    setAssets(assets)
  }

  const [tags, setTags] = useState<string[]>(formDraft?.tags || [])
  const [isTagInputOpen, setTagInputOpen] = useState(false)
  const canTag = features.moment_tag
  const isTagRowVisible = canTag && (isTagInputOpen || tags.length > 0)
  const isTagsFull = tags.length >= MOMENT_TAGS_MAX_COUNT
  const tagFragments = tags.map(toDigestTagPlaceholder)

  const updateTags = (newTags: string[]) => {
    formStorage.set<FormDraft>(
      formStorageKey,
      { ...formDraft, tags: newTags },
      'local'
    )
    setTags(newTags)

    if (newTags.length === 0) {
      setTagInputOpen(false)
    }
  }

  const onAddTag = (tag: string) => {
    const newTag = normalizeTag(tag)

    if (!newTag || tags.includes(newTag) || isTagsFull) {
      return
    }

    updateTags([...tags, newTag])
    setTagInputOpen(false)
  }

  const onRemoveTag = (tag: string) => {
    updateTags(tags.filter((t) => t !== tag))
  }

  const onToggleTagInput = () => {
    setTagInputOpen(!isTagInputOpen)
  }

  const contentCount = stripHtml(content).length

  const isValid =
    ((contentCount > 0 && contentCount <= MAX_MOMENT_CONTENT_LENGTH) ||
      assets.length > 0) &&
    assets.every(({ uploaded }) => uploaded)

  const showClearButton =
    contentCount > 0 || assets.length > 0 || tags.length > 0

  const handleSubmit = async (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault()

    try {
      setSubmitting(true)
      const { data } = await putMoment({
        variables: {
          input: {
            content: sanitizeContent(content),
            assets: assets.map(({ assetId }) => assetId),
            tags: canTag ? tags : undefined,
          },
        },
        update: (cache, mutationResult) => {
          cache.evict({ id: cache.identify(viewer), fieldName: 'writings' })

          mutationResult.data?.putMoment.tags?.forEach((tag) => {
            if (!tag) {
              return
            }

            const tagCacheId = cache.identify(tag)
            cache.evict({ id: tagCacheId, fieldName: 'moments' })
            cache.evict({ id: tagCacheId, fieldName: 'numMoments' })
          })

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

      toast.info({
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
          toast.info({
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
    setTags([])
    setTagInputOpen(false)
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
    const currentDraft = formStorage.get<FormDraft>(formStorageKey, 'local')
    formStorage.set<FormDraft>(
      formStorageKey,
      { ...currentDraft, content: newContent },
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

  const isAssetsFull = assets.length >= UPLOAD_MOMENT_ASSET_COUNT_LIMIT
  const uploaderFieldId = 'moment-edit-assets-uploader-form'
  const imageButtonClasses = classNames({
    [styles.iconButton]: true,
    [styles.iconButtonDisabled]: isAssetsFull,
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
          {showClearButton && (
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

        {isTagRowVisible && (
          <section className={styles.tags}>
            {tagFragments.map((tag) => (
              <InlineTag
                key={tag.id}
                tag={tag}
                onRemoveTag={() => onRemoveTag(tag.content)}
              />
            ))}
            {isTagInputOpen && !isTagsFull && (
              <TagInput
                tags={tagFragments}
                onAddTag={onAddTag}
                disableSuggestions={!viewer.isActive}
              />
            )}
          </section>
        )}

        <section
          className={classNames({
            [styles.assets]: true,
            [styles.hasAssets]: assets.length > 0,
          })}
        >
          <MomentAssetsUploader
            assets={assets}
            updateAssets={updateAssets}
            fieldId={uploaderFieldId}
            hideAddButton
          />
        </section>

        <footer className={styles.footer}>
          <section className={styles.left}>
            <label className={imageButtonClasses} htmlFor={uploaderFieldId}>
              <Icon
                icon={IconImage}
                size={22}
                color={isAssetsFull ? 'greyLight' : 'greyDarker'}
              />
            </label>
            {canTag && (
              <button
                type="button"
                className={styles.iconButton}
                onClick={onToggleTagInput}
                disabled={isTagsFull}
                aria-label={intl.formatMessage({
                  defaultMessage: 'Add Tags',
                  id: 'WNxQX0',
                })}
              >
                <Icon
                  icon={IconHashTag}
                  size={22}
                  color={isTagsFull ? 'greyLight' : 'greyDarker'}
                />
              </button>
            )}
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
