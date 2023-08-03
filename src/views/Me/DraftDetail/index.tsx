import { useQuery } from '@apollo/react-hooks'
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
  useRoute,
} from '~/components'
import { QueryError, useMutation } from '~/components/GQL'
import UPLOAD_FILE from '~/components/GQL/mutations/uploadFile'
import {
  DraftDetailQueryQuery,
  SetDraftContentMutation,
  SingleFileUploadMutation,
} from '~/gql/graphql'

import BottomBar from './BottomBar'
import { DRAFT_DETAIL, SET_CONTENT } from './gql'
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

const DraftDetail = () => {
  const { getQuery } = useRoute()
  const id = getQuery('draftId')

  const [setContent] = useMutation<SetDraftContentMutation>(SET_CONTENT)
  const [singleFileUpload] = useMutation<SingleFileUploadMutation>(UPLOAD_FILE)
  const [saveStatus, setSaveStatus] = useState<
    'saved' | 'saving' | 'saveFailed'
  >()
  const [hasValidSummary, setHasValidSummary] = useState<boolean>(true)

  const { data, loading, error } = useQuery<DraftDetailQueryQuery>(
    DRAFT_DETAIL,
    {
      variables: { id },
      fetchPolicy: 'network-only',
    }
  )
  const draft = (data?.node?.__typename === 'Draft' && data.node) || undefined
  const ownCircles = data?.viewer?.ownCircles || undefined

  if (loading) {
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

  if (!draft) {
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
  const publishable =
    id && isUnpublished && hasContent && hasTitle && hasValidSummary

  const upload = async (input: { [key: string]: any }) => {
    const result = await singleFileUpload({
      variables: {
        input: {
          type: ASSET_TYPE.embed,
          entityType: ENTITY_TYPE.draft,
          entityId: draft && draft.id,
          ...input,
        },
      },
    })
    const { id: assetId, path } =
      (result && result.data && result.data.singleFileUpload) || {}

    if (assetId && path) {
      return { id: assetId, path }
    } else {
      throw new Error('upload not successful')
    }
  }

  const update = async (newDraft: {
    title?: string | null
    content?: string | null
    cover?: string | null
    summary?: string | null
  }) => {
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

      await setContent({ variables: { id: draft?.id, ...newDraft } })
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
