import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'

import { Spinner } from '~/components'
import { fragments as EditorFragments } from '~/components/Editor/fragments'
import { HeaderContext } from '~/components/GlobalHeader/Context'
import { QueryError } from '~/components/GQL'
import { Head } from '~/components/Head'
import Throw404 from '~/components/Throw404'

import { getQuery } from '~/common/utils'

import DraftContent from './Content'
import PublishState from './PublishState'
import Sidebar from './Sidebar'
import styles from './styles.css'

import { DraftDetailQuery } from './__generated__/DraftDetailQuery'

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

const DraftDetail = () => {
  const router = useRouter()
  const id = getQuery({ router, key: 'id' })
  const { updateHeaderState } = useContext(HeaderContext)

  useEffect(() => {
    updateHeaderState({ type: 'draft', state: '', draftId: id })
    return () => updateHeaderState({ type: 'default' })
  }, [])

  const { data, loading, error } = useQuery<DraftDetailQuery>(DRAFT_DETAIL, {
    variables: { id },
    fetchPolicy: 'network-only'
  })

  if (error) {
    return <QueryError error={error} />
  }

  if (!loading && (!data || !data.node || data.node.__typename !== 'Draft')) {
    return <Throw404 />
  }

  const draft = data?.node?.__typename === 'Draft' && data.node

  return (
    <main className="l-row">
      <Head title={{ zh_hant: '編輯草稿', zh_hans: '编辑草稿' }} />

      <article className="l-col-4 l-col-md-5 l-col-lg-8">
        {loading && <Spinner />}

        {!loading && draft && (
          <>
            <PublishState draft={draft} />
            <DraftContent draft={draft} />
          </>
        )}
      </article>

      <aside className="l-col-4 l-col-md-3 l-col-lg-4">
        {loading && <Spinner />}
        {draft && <Sidebar draft={draft} />}
      </aside>

      <style jsx>{styles}</style>
    </main>
  )
}

export default DraftDetail
