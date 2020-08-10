import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useState } from 'react'

import { Head, Layout, Spinner, Throw404 } from '~/components'
import { fragments as EditorFragments } from '~/components/Editor/fragments'
import { QueryError, useMutation } from '~/components/GQL'
import UPLOAD_FILE from '~/components/GQL/mutations/uploadFile'

import { getQuery, stripHtml } from '~/common/utils'

import PublishButton from './PublishButton'
import PublishState from './PublishState'
import SaveStatus from './SaveStatus'
import Sidebar from './Sidebar'

import { SingleFileUpload } from '~/components/GQL/mutations/__generated__/SingleFileUpload'
import { DraftDetailQuery } from './__generated__/DraftDetailQuery'
import { UpdateDraft } from './__generated__/UpdateDraft'

const Editor = dynamic(() => import('~/components/Editor/Article'), {
  ssr: false,
  loading: Spinner,
})

const DRAFT_DETAIL = gql`
  query DraftDetailQuery($id: ID!) {
    node(input: { id: $id }) {
      id
      ... on Draft {
        ...EditorDraft
        ...DraftSidebarDraft
        ...PublishStateDraft
      }
    }
  }
  ${EditorFragments.draft}
  ${Sidebar.fragments.draft}
  ${PublishState.fragments.draft}
`

export const UPDATE_DRAFT = gql`
  mutation UpdateDraft($id: ID!, $title: String, $content: String) {
    putDraft(input: { id: $id, title: $title, content: $content }) {
      id
      title
      content
      cover
      assets {
        id
        type
        path
      }
    }
  }
`

const EmptyLayout: React.FC = ({ children }) => (
  <Layout.Main>
    <Layout.Header left={<Layout.Header.BackButton />} />
    {children}
  </Layout.Main>
)

const DraftDetail = () => {
  const router = useRouter()
  const id = getQuery({ router, key: 'draftId' })
  const { data, loading, error } = useQuery<DraftDetailQuery>(DRAFT_DETAIL, {
    variables: { id },
    fetchPolicy: 'network-only',
  })
  const [updateDraft] = useMutation<UpdateDraft>(UPDATE_DRAFT)
  const [singleFileUpload] = useMutation<SingleFileUpload>(UPLOAD_FILE)
  const [saveStatus, setSaveStatus] = useState<
    'saved' | 'saving' | 'saveFailed'
  >()

  if (error) {
    return (
      <EmptyLayout>
        <QueryError error={error} />
      </EmptyLayout>
    )
  }

  if (!loading && (!data || !data.node || data.node.__typename !== 'Draft')) {
    return (
      <EmptyLayout>
        <Throw404 />
      </EmptyLayout>
    )
  }

  if (!process.browser) {
    return <EmptyLayout />
  }

  const draft = (data?.node?.__typename === 'Draft' && data.node) || undefined
  const hasContent =
    draft?.content && stripHtml(draft.content).trim().length > 0
  const hasTitle = draft?.title && draft.title.length > 0
  const isUnpublished = draft?.publishState === 'unpublished'
  const publishable = id && isUnpublished && hasContent && hasTitle

  const upload = async (input: { [key: string]: any }) => {
    const result = await singleFileUpload({
      variables: {
        input: {
          type: 'embed',
          entityType: 'draft',
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
    coverAssetId?: string | null
  }) => {
    try {
      if (draft?.publishState === 'published') {
        return
      }

      setSaveStatus('saving')
      await updateDraft({ variables: { id: draft?.id, ...newDraft } })
      setSaveStatus('saved')
    } catch (error) {
      setSaveStatus('saveFailed')
    }
  }

  return (
    <Layout.Main
      aside={
        <>
          {loading && <Spinner />}
          {draft && <Sidebar draft={draft} setSaveStatus={setSaveStatus} />}
        </>
      }
      keepAside
    >
      <Layout.Header
        left={<Layout.Header.BackButton />}
        right={
          <>
            <SaveStatus status={saveStatus} />
            {draft && <PublishButton disabled={!publishable} />}
          </>
        }
      />

      <Head title={{ zh_hant: '編輯草稿', zh_hans: '编辑草稿' }} />

      {loading && <Spinner />}

      {!loading && draft && (
        <>
          <PublishState draft={draft} />

          <Layout.Spacing>
            <Editor draft={draft} update={update} upload={upload} />
          </Layout.Spacing>
        </>
      )}
    </Layout.Main>
  )
}

export default DraftDetail
