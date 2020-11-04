import { useQuery } from '@apollo/react-hooks'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useState } from 'react'

import { Head, Layout, Spinner, Throw404, useResponsive } from '~/components'
import { QueryError, useMutation } from '~/components/GQL'
import UPLOAD_FILE from '~/components/GQL/mutations/uploadFile'

import { ASSET_TYPE, ENTITY_TYPE } from '~/common/enums'
import { getQuery, stripHtml } from '~/common/utils'

import BottomBar from './BottomBar'
import { DRAFT_DETAIL, SET_CONTENT } from './gql'
import PublishButton from './PublishButton'
import PublishState from './PublishState'
import SaveStatus from './SaveStatus'
import Sidebar from './Sidebar'

import { SingleFileUpload } from '~/components/GQL/mutations/__generated__/SingleFileUpload'
import { DraftDetailQuery } from './__generated__/DraftDetailQuery'
import { SetDraftContent } from './__generated__/SetDraftContent'

const Editor = dynamic(() => import('~/components/Editor/Article'), {
  ssr: false,
  loading: Spinner,
})

const EmptyLayout: React.FC = ({ children }) => (
  <Layout.Main>
    <Layout.Header left={<Layout.Header.BackButton />} />
    {children}
  </Layout.Main>
)

const DraftDetail = () => {
  const isLargeUp = useResponsive('lg-up')
  const router = useRouter()
  const id = getQuery({ router, key: 'draftId' })

  const [setContent] = useMutation<SetDraftContent>(SET_CONTENT)
  const [singleFileUpload] = useMutation<SingleFileUpload>(UPLOAD_FILE)
  const [saveStatus, setSaveStatus] = useState<
    'saved' | 'saving' | 'saveFailed'
  >()

  const { data, loading, error } = useQuery<DraftDetailQuery>(DRAFT_DETAIL, {
    variables: { id },
    fetchPolicy: 'network-only',
  })
  const draft = (data?.node?.__typename === 'Draft' && data.node) || undefined

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
  const publishable = id && isUnpublished && hasContent && hasTitle

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
  }) => {
    try {
      if (draft?.publishState === 'published') {
        return
      }

      setSaveStatus('saving')
      await setContent({ variables: { id: draft?.id, ...newDraft } })
      setSaveStatus('saved')
    } catch (error) {
      setSaveStatus('saveFailed')
    }
  }

  return (
    <Layout.Main aside={<Sidebar draft={draft} />} inEditor>
      <Layout.Header
        left={<Layout.Header.BackButton />}
        right={
          <>
            <SaveStatus status={saveStatus} />
            {draft && <PublishButton disabled={!publishable} />}
          </>
        }
      />

      <Head
        title={{
          zh_hant: `[草稿] ${draft.title}`,
          zh_hans: `[草稿] ${draft.title}`,
        }}
      />

      <PublishState draft={draft} />

      <Layout.Spacing>
        <Editor draft={draft} update={update} upload={upload} />
      </Layout.Spacing>

      {!isLargeUp && <BottomBar draft={draft} />}
    </Layout.Main>
  )
}

export default DraftDetail
