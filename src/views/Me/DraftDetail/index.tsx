import { useQuery } from '@apollo/react-hooks'
import _omit from 'lodash/omit'
import dynamic from 'next/dynamic'
import { useContext, useState } from 'react'
import { useIntl } from 'react-intl'

import {
  ASSET_TYPE,
  ENTITY_TYPE,
  MAX_ARTICLE_CONTENT_LENGTH,
} from '~/common/enums'
import { containsFigureTag, stripHtml } from '~/common/utils'
import {
  DraftDetailStateContext,
  DraftDetailStateProvider,
  EmptyLayout,
  Head,
  Layout,
  Media,
  SpinnerBlock,
  Throw404,
  useCreateDraft,
  useDirectImageUpload,
  useUnloadConfirm,
} from '~/components'
import { QueryError, useMutation } from '~/components/GQL'
import {
  DIRECT_IMAGE_UPLOAD,
  DIRECT_IMAGE_UPLOAD_DONE,
  SINGLE_FILE_UPLOAD,
} from '~/components/GQL/mutations/uploadFile'
import {
  ArticleAccessType,
  ArticleLicenseType,
  DirectImageUploadDoneMutation,
  DirectImageUploadMutation,
  DraftDetailQueryQuery,
  DraftDetailViewerQueryQuery,
  PublishState as PublishStateType,
  SetDraftContentMutation,
  SingleFileUploadMutation,
} from '~/gql/graphql'

import BottomBar from './BottomBar'
import { DRAFT_DETAIL, DRAFT_DETAIL_VIEWER, SET_CONTENT } from './gql'
import PublishState from './PublishState'
import SaveStatus from './SaveStatus'
import SettingsButton from './SettingsButton'
import Sidebar from './Sidebar'
import styles from './styles.module.css'

const Editor = dynamic(
  () => import('~/components/Editor/Article').then((mod) => mod.ArticleEditor),
  {
    ssr: false,
    loading: () => <SpinnerBlock />,
  }
)

const EMPTY_DRAFT: DraftDetailQueryQuery['node'] = {
  id: '',
  title: '',
  publishState: PublishStateType.Unpublished,
  content: '',
  summary: '',
  summaryCustomized: false,
  __typename: 'Draft',
  article: null,
  cover: null,
  assets: [],
  tags: null,
  collection: {
    edges: null,
    __typename: 'ArticleConnection',
  },
  access: {
    type: ArticleAccessType.Public,
    circle: null,
    __typename: 'DraftAccess',
  },
  license: ArticleLicenseType.Cc_0,
  requestForDonation: null,
  replyToDonator: null,
  sensitiveByAuthor: false,
  iscnPublish: null,
  canComment: true,
  campaigns: [],
}

const BaseDraftDetail = () => {
  const intl = useIntl()

  const { addRequest, getDraftId, isNewDraft } = useContext(
    DraftDetailStateContext
  )
  const [initNew] = useState(isNewDraft())
  const { createDraft } = useCreateDraft()
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
  const [hasValidSummary, setHasValidSummary] = useState<boolean>(true)

  const { data, loading, error } = useQuery<DraftDetailQueryQuery>(
    DRAFT_DETAIL,
    {
      variables: { id: getDraftId() },
      fetchPolicy: 'network-only',
      skip: isNewDraft(),
    }
  )
  const { data: viewerData, loading: viewerLoading } =
    useQuery<DraftDetailViewerQueryQuery>(DRAFT_DETAIL_VIEWER, {
      fetchPolicy: 'network-only',
    })

  const draft = (data?.node?.__typename === 'Draft' && data.node) || EMPTY_DRAFT
  const ownCircles = viewerData?.viewer?.ownCircles || undefined
  const campaigns = viewerData?.viewer?.campaigns.edges?.map((e) => e.node)
  const [contentLength, setContentLength] = useState(0)
  const isOverLength = contentLength > MAX_ARTICLE_CONTENT_LENGTH

  useUnloadConfirm({ block: saveStatus === 'saving' && !isNewDraft() })

  if ((loading && !initNew) || viewerLoading) {
    return (
      <EmptyLayout>
        <SpinnerBlock />
      </EmptyLayout>
    )
  }

  if (error) {
    return (
      <EmptyLayout>
        <QueryError error={error} />
      </EmptyLayout>
    )
  }

  if (!draft && !isNewDraft()) {
    return (
      <EmptyLayout>
        <Throw404 />
      </EmptyLayout>
    )
  }

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
    hasValidSummary &&
    !isOverLength
  )

  const upload = async (input: {
    [key: string]: string | File
  }): Promise<{ id: string; path: string }> => {
    const isImage = input.type !== ASSET_TYPE.embedaudio

    // create draft first if not exist
    let draftId = draft?.id
    if (!draftId) {
      await createDraft({
        onCreate: (newDraftId) => {
          draftId = newDraftId
        },
      })
    }

    const variables = {
      input: {
        type: ASSET_TYPE.embed,
        entityType: ENTITY_TYPE.draft,
        entityId: draftId,
        ...input,
      },
    }

    // upload via directImageUpload
    if (isImage) {
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

        return { id: assetId, path }
      } else {
        throw new Error('upload not successful')
      }
    }
    // upload via singleFileUpload
    else {
      const result = await singleFileUpload({ variables })
      const { id: assetId, path } = result?.data?.singleFileUpload || {}

      if (assetId && path) {
        return { id: assetId, path }
      } else {
        throw new Error('upload not successful')
      }
    }
  }

  const update = async (newDraft: {
    title?: string | null
    content?: string | null
    cover?: string | null
    summary?: string | null
  }) => {
    const isEmpty = Object.values(newDraft).every((x) => x === '')
    if (isNewDraft() && isEmpty) {
      return
    }

    try {
      if (draft?.publishState === 'published') {
        return
      }

      // check content length
      const len = stripHtml(newDraft.content || '').length
      setContentLength(len)
      if (len > MAX_ARTICLE_CONTENT_LENGTH) {
        return
      }

      setSaveStatus('saving')

      if (!isNewDraft()) {
        await setContent({ variables: { id: getDraftId(), ...newDraft } })
      } else {
        await createDraft({
          onCreate: async (draftId: string) => {
            await setContent({ variables: { id: draftId, ...newDraft } })
          },
        })
      }

      setSaveStatus('saved')

      if (newDraft.summary && !hasValidSummary) {
        setHasValidSummary(true)
      }
    } catch (error) {
      setSaveStatus('saveFailed')

      if (newDraft.summary && hasValidSummary) {
        setHasValidSummary(false)
      }
    }
  }

  return (
    <Layout.Main
      aside={
        <Media greaterThanOrEqual="lg">
          <Sidebar
            draft={draft}
            campaigns={campaigns}
            ownCircles={ownCircles}
          />
        </Media>
      }
    >
      <Layout.Header
        mode="compact"
        right={
          <section className={styles.headerRight}>
            <SaveStatus status={saveStatus} />

            <section>
              {isOverLength && (
                <span className={styles.count}>
                  {contentLength} / {MAX_ARTICLE_CONTENT_LENGTH}
                </span>
              )}
              {draft && (
                <SettingsButton
                  draft={draft}
                  // campaigns={campaigns}
                  ownCircles={ownCircles}
                  publishable={!!publishable}
                />
              )}
            </section>
          </section>
        }
      />

      <Head
        title={intl.formatMessage(
          {
            defaultMessage: '[Draft] {draftTitle}',
            id: '33oNeg',
          },
          { draftTitle: draft.title }
        )}
      />

      <PublishState draft={draft} />

      <Layout.Main.Spacing>
        <Editor
          draft={draft}
          update={async (props) => addRequest(() => update(props))}
          upload={upload}
        />
      </Layout.Main.Spacing>

      <Media lessThan="lg">
        <BottomBar draft={draft} ownCircles={ownCircles} />
      </Media>
    </Layout.Main>
  )
}

const DraftDetail = () => (
  <DraftDetailStateProvider>
    <BaseDraftDetail />
  </DraftDetailStateProvider>
)

export default DraftDetail
