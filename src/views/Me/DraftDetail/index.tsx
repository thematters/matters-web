import { useQuery } from '@apollo/react-hooks'
import _omit from 'lodash/omit'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import { FormattedMessage } from 'react-intl'

import {
  ASSET_TYPE,
  ENTITY_TYPE,
  MAX_ARTICLE_CONTENT_LENGTH,
} from '~/common/enums'
import { stripHtml } from '~/common/utils'
import {
  EmptyLayout,
  Head,
  Layout,
  Media,
  Spinner,
  Throw404,
  toast,
  useCreateDraft,
  useDirectImageUpload,
  useRoute,
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
  DraftDetailCirclesQueryQuery,
  DraftDetailQueryQuery,
  PublishState as PublishStateType,
  SetDraftContentMutation,
  SingleFileUploadMutation,
} from '~/gql/graphql'

import BottomBar from './BottomBar'
import { DRAFT_DETAIL, DRAFT_DETAIL_CIRCLES, SET_CONTENT } from './gql'
import PublishState from './PublishState'
import SaveStatus from './SaveStatus'
import SettingsButton from './SettingsButton'
import Sidebar from './Sidebar'

const Editor = dynamic(
  () => import('~/components/Editor/Article').then((mod) => mod.ArticleEditor),
  {
    ssr: false,
    loading: Spinner,
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
}

const DraftDetail = () => {
  const { getQuery } = useRoute()
  const id = getQuery('draftId')
  const isInNew = id === 'new'

  const [initNew] = useState(isInNew)
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
      variables: { id },
      fetchPolicy: 'network-only',
      skip: isInNew,
    }
  )
  const { data: circleData, loading: circleLoading } =
    useQuery<DraftDetailCirclesQueryQuery>(DRAFT_DETAIL_CIRCLES, {
      fetchPolicy: 'network-only',
    })

  const draft = (data?.node?.__typename === 'Draft' && data.node) || EMPTY_DRAFT
  const ownCircles = circleData?.viewer?.ownCircles || undefined

  useUnloadConfirm({ block: saveStatus === 'saving' && !isInNew })

  if ((loading && !initNew) || circleLoading) {
    return (
      <EmptyLayout>
        <Spinner />
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

  if (!draft && !isInNew) {
    return (
      <EmptyLayout>
        <Throw404 />
      </EmptyLayout>
    )
  }

  const hasContent =
    draft?.content && stripHtml(draft.content).trim().length > 0
  const hasTitle = draft?.title && draft.title.length > 0
  const isUnpublished = draft?.publishState === 'unpublished'
  const publishable = !!(
    id &&
    isUnpublished &&
    hasContent &&
    hasTitle &&
    hasValidSummary
  )

  const upload = async (input: {
    [key: string]: any
  }): Promise<{ id: string; path: string }> => {
    const isImage = input.type !== ASSET_TYPE.embedaudio
    const variables = {
      input: {
        type: ASSET_TYPE.embed,
        entityType: ENTITY_TYPE.draft,
        entityId: draft && draft.id,
        ...input,
      },
    }

    // feature flag
    const isForceSingleFileUpload = !!getQuery('single-file-upload')

    // upload via directImageUpload
    if (isImage && !isForceSingleFileUpload) {
      const result = await directImageUpload({ variables })
      const {
        id: assetId,
        path,
        uploadURL,
      } = result?.data?.directImageUpload || {}

      if (assetId && path && uploadURL) {
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
    if (isInNew && isEmpty) {
      return
    }

    try {
      if (draft?.publishState === 'published') {
        return
      }

      // check content length
      const contentCount = newDraft.content?.length || 0
      if (contentCount > MAX_ARTICLE_CONTENT_LENGTH) {
        toast.error({
          message: (
            <FormattedMessage
              defaultMessage={`Content length exceeds limit ({length}/{limit})`}
              id="VefaFQ"
              values={{
                length: contentCount,
                limit: MAX_ARTICLE_CONTENT_LENGTH,
              }}
            />
          ),
        })
        return
      }

      setSaveStatus('saving')

      if (draft?.id) {
        await setContent({ variables: { id: draft.id, ...newDraft } })
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
          <Sidebar draft={draft} ownCircles={ownCircles} />
        </Media>
      }
      inEditor
    >
      <Layout.Header
        mode="compact"
        right={
          <>
            <SaveStatus status={saveStatus} />
            {draft && (
              <SettingsButton
                draft={draft}
                ownCircles={ownCircles}
                publishable={!!publishable}
              />
            )}
          </>
        }
      />

      <Head
        title={{
          zh_hant: `[草稿] ${draft.title}`,
          zh_hans: `[草稿] ${draft.title}`,
          en: `[Draft] ${draft.title}`,
        }}
      />

      <PublishState draft={draft} />

      <Layout.Main.Spacing>
        <Editor draft={draft} update={update} upload={upload} />
      </Layout.Main.Spacing>

      <Media lessThan="lg">
        <BottomBar draft={draft} ownCircles={ownCircles} />
      </Media>
    </Layout.Main>
  )
}

export default DraftDetail
