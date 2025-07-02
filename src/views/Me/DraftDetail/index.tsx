import { ApolloError } from '@apollo/client'
import _omit from 'lodash/omit'
import dynamic from 'next/dynamic'
import { useContext, useState } from 'react'
import { useIntl } from 'react-intl'

import {
  ASSET_TYPE,
  ENTITY_TYPE,
  ERROR_CODES,
  MAX_ARTICLE_CONTENT_LENGTH,
  PATHS,
} from '~/common/enums'
import {
  containsFigureTag,
  parseFormSubmitErrors,
  stripHtml,
} from '~/common/utils'
import {
  DraftDetailStateContext,
  DraftDetailStateProvider,
  DrawerProvider,
  Head,
  Layout,
  Media,
  SpinnerBlock,
  useDirectImageUpload,
  useRoute,
  useUnloadConfirm,
} from '~/components'
import { useMutation } from '~/components/GQL'
import {
  DIRECT_IMAGE_UPLOAD,
  DIRECT_IMAGE_UPLOAD_DONE,
  SINGLE_FILE_UPLOAD,
} from '~/components/GQL/mutations/uploadFile'
import {
  DirectImageUploadDoneMutation,
  DirectImageUploadMutation,
  SetDraftContentMutation,
  SingleFileUploadMutation,
} from '~/gql/graphql'

import { DraftLoadingStates } from './DraftLoadingStates'
import { SET_CONTENT } from './gql'
import { useDraftDetail } from './hooks'
import { OptionButton } from './OptionButton'
import PublishButton from './PublishButton'
import PublishState from './PublishState'
import SaveStatus from './SaveStatus'
import styles from './styles.module.css'

const Editor = dynamic(
  () => import('~/components/Editor/Article').then((mod) => mod.ArticleEditor),
  {
    ssr: false,
    loading: () => <SpinnerBlock />,
  }
)

const DynamicOptionDrawer = dynamic(
  () => import('./OptionDrawer').then((mod) => mod.OptionDrawer),
  {
    ssr: false,
  }
)

const BaseDraftDetail = () => {
  const intl = useIntl()
  const { router } = useRoute()

  const { addRequest, createDraft, getDraftId, isNewDraft, getDraftUpdatedAt } =
    useContext(DraftDetailStateContext)

  const {
    draft,
    viewerData,
    ownCircles,
    ownCollections,
    appliedCampaigns,
    loading,
    error,
    loadMoreCollections,
  } = useDraftDetail()

  const [setContent] = useMutation<SetDraftContentMutation>(SET_CONTENT)
  const [singleFileUpload] =
    useMutation<SingleFileUploadMutation>(SINGLE_FILE_UPLOAD)
  const [directImageUpload] =
    useMutation<DirectImageUploadMutation>(DIRECT_IMAGE_UPLOAD)
  const [directImageUploadDone] = useMutation<DirectImageUploadDoneMutation>(
    DIRECT_IMAGE_UPLOAD_DONE,
    undefined,
    { showToast: false }
  )
  const { upload: uploadImage } = useDirectImageUpload()

  const [saveStatus, setSaveStatus] = useState<
    'saved' | 'saving' | 'saveFailed'
  >()

  const [contentLength, setContentLength] = useState(0)
  const isOverLength = contentLength > MAX_ARTICLE_CONTENT_LENGTH

  const [isOpenOptionDrawer, setIsOpenOptionDrawer] = useState(false)
  const toggleOptionDrawer = () => {
    setIsOpenOptionDrawer((prevState) => !prevState)
  }

  useUnloadConfirm({ block: saveStatus === 'saving' && !isNewDraft() })

  const hasContent =
    draft?.content &&
    (stripHtml(draft.content).length > 0 || containsFigureTag(draft.content))
  const hasTitle = draft?.title && draft.title.length > 0
  const isUnpublished = draft?.publishState === 'unpublished'
  const publishable = !!(
    getDraftId() &&
    isUnpublished &&
    hasContent &&
    hasTitle &&
    !isOverLength &&
    (!saveStatus || saveStatus === 'saved')
  )

  const upload = async (input: {
    [key: string]: string | File
  }): Promise<{ id: string; path: string }> => {
    const isImage = input.type !== ASSET_TYPE.embedaudio

    // create draft first if not exist
    let draftId = getDraftId()
    if (!draftId) {
      await createDraft({
        onCreate: (newDraftId) => {
          draftId = newDraftId
        },
      })
    }

    setSaveStatus('saving')

    const variables = {
      input: {
        type: ASSET_TYPE.embed,
        entityType: ENTITY_TYPE.draft,
        entityId: draftId,
        ...input,
      },
    }

    const trySingleUpload = async () => {
      const result = await singleFileUpload({
        variables: _omit(variables, ['input.mime']),
      })
      const { id: assetId, path } = result?.data?.singleFileUpload || {}

      if (assetId && path) {
        setSaveStatus('saved')
        return { id: assetId, path }
      } else {
        setSaveStatus('saveFailed')
        throw new Error('upload not successful')
      }
    }

    const tryDirectUpload = async () => {
      const result = await directImageUpload({
        variables: _omit(variables, ['input.file']),
      })
      const {
        id: assetId,
        path,
        uploadURL,
      } = result?.data?.directImageUpload || {}

      if (assetId && path && uploadURL && input.file instanceof File) {
        try {
          await uploadImage({ uploadURL, file: input.file })
        } catch (error) {
          console.error(error)
          throw new Error('upload not successful')
        }

        // (async) mark asset draft as false
        directImageUploadDone({
          variables: {
            ..._omit(variables.input, ['file']),
            draft: false,
            url: path,
          },
        }).catch(console.error)

        setSaveStatus('saved')
        return { id: assetId, path }
      } else {
        setSaveStatus('saveFailed')
        throw new Error('upload not successful')
      }
    }

    // upload via directImageUpload
    if (isImage) {
      try {
        return await tryDirectUpload()
      } catch {
        return await trySingleUpload()
      }
    }
    // upload via singleFileUpload
    else {
      return await trySingleUpload()
    }
  }

  const update = async (
    newDraft: {
      title?: string | null
      content?: string | null
      cover?: string | null
      summary?: string | null
    },
    forceUpdate?: boolean
  ) => {
    const isEmpty = Object.values(newDraft).every((x) => x === '')
    if (isNewDraft() && isEmpty) {
      return
    }

    if (draft?.publishState === 'published') {
      return
    }

    // check content length
    const len = stripHtml(newDraft.content || '').length
    setContentLength(len)
    if (len > MAX_ARTICLE_CONTENT_LENGTH) {
      return
    }

    try {
      setSaveStatus('saving')

      let draftId = getDraftId()
      if (!draftId) {
        await createDraft({
          onCreate: (newDraftId) => {
            draftId = newDraftId
          },
        })
      }

      await setContent({
        variables: {
          id: draftId,
          ...newDraft,
          lastUpdatedAt: forceUpdate ? undefined : getDraftUpdatedAt(),
        },
      })

      setSaveStatus('saved')
    } catch (error) {
      setSaveStatus('saveFailed')

      setTimeout(() => {
        const [, codes] = parseFormSubmitErrors(error as ApolloError)
        codes.forEach((code) => {
          if (code.includes(ERROR_CODES.DRAFT_VERSION_CONFLICT)) {
            const confirmResult = window.confirm(
              intl.formatMessage({
                defaultMessage:
                  'The draft has been updated on another device or tab. Click OK to continue editing and overwrite this version.',
                id: 'kEfk9g',
              })
            )

            if (confirmResult) {
              update(newDraft, true)
            } else {
              router.push(PATHS.ME_DRAFTS)
            }
          }
        })
      })
    }
  }

  return (
    <DraftLoadingStates
      loading={loading}
      error={error}
      draft={draft}
      isNewDraft={isNewDraft}
    >
      <Layout
        header={
          <>
            <section className={styles.header}>
              <SaveStatus status={saveStatus} />

              <section className={styles.headerRight}>
                {isOverLength && (
                  <span className={styles.count}>
                    {contentLength} / {MAX_ARTICLE_CONTENT_LENGTH}
                  </span>
                )}

                <OptionButton onClick={toggleOptionDrawer} />

                {draft && (
                  <PublishButton
                    draft={draft}
                    campaigns={appliedCampaigns}
                    ownCircles={ownCircles}
                    publishable={!!publishable}
                  />
                )}
              </section>
            </section>
          </>
        }
      >
        <Head
          noSuffix
          title={
            draft?.title
              ? intl.formatMessage(
                  {
                    defaultMessage: 'Draft - {title}',
                    id: 'gvTltk',
                  },
                  { title: draft?.title }
                )
              : intl.formatMessage({
                  defaultMessage: 'Draft - Untitled',
                  id: 'qcAuPU',
                })
          }
        />

        <PublishState draft={draft} />

        <Layout.Main.Spacing>
          <Editor
            draft={draft}
            update={async (props) => addRequest(() => update(props))}
            upload={async (props) => addRequest(() => upload(props))}
          />

          <PublishState draft={draft} />

          <Media greaterThan="sm">
            <DynamicOptionDrawer
              isOpen={isOpenOptionDrawer}
              onClose={toggleOptionDrawer}
              draft={draft}
              draftViewer={viewerData}
              campaigns={appliedCampaigns}
              ownCircles={ownCircles}
              ownCollections={ownCollections}
              loadMoreCollections={loadMoreCollections}
            />
          </Media>
        </Layout.Main.Spacing>
      </Layout>
    </DraftLoadingStates>
  )
}

const DraftDetail = () => (
  <DrawerProvider>
    <DraftDetailStateProvider>
      <BaseDraftDetail />
    </DraftDetailStateProvider>
  </DrawerProvider>
)

export default DraftDetail
