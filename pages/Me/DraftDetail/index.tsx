import gql from 'graphql-tag'
import { withRouter, WithRouterProps } from 'next/router'
import { useContext, useEffect } from 'react'
import { QueryResult } from 'react-apollo'

import { fragments as EditorFragments } from '~/components/Editor/fragments'
import EmptyDraft from '~/components/Empty/EmptyDraft'
import { HeaderContext } from '~/components/GlobalHeader/Context'
import { Query } from '~/components/GQL'
import { Head } from '~/components/Head'
import { Translate } from '~/components/Language'
import { Placeholder } from '~/components/Placeholder'
import { Protected } from '~/components/Protected'

import { getQuery } from '~/common/utils'

import { DraftDetailQuery } from './__generated__/DraftDetailQuery'
import DraftContent from './Content'
import PublishState from './PublishState'
import Sidebar from './Sidebar'
import styles from './styles.css'

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

const DraftDetail: React.FC<WithRouterProps> = ({ router }) => {
  const id = getQuery({ router, key: 'id' })

  if (!id) {
    return null
  }

  const { updateHeaderState } = useContext(HeaderContext)

  useEffect(() => {
    updateHeaderState({ type: 'draft', state: '', draftId: id })

    return () => updateHeaderState({ type: 'default' })
  }, [])

  return (
    <Protected>
      <Query query={DRAFT_DETAIL} variables={{ id }}>
        {({
          data,
          loading,
          error
        }: QueryResult & { data: DraftDetailQuery }) => (
          <main className="l-row">
            <Head title={{ zh_hant: '編輯草稿', zh_hans: '编辑草稿' }} />

            <article className="l-col-4 l-col-md-5 l-col-lg-8">
              {loading && <Placeholder.ArticleDetail />}
              {data && data.node && (
                <>
                  <PublishState draft={data.node} />
                  <DraftContent draft={data.node} />
                </>
              )}
              {!loading && (error || (data && !data.node)) && (
                <EmptyDraft
                  description={
                    <Translate zh_hant="草稿不存在" zh_hans="草稿不存在" />
                  }
                />
              )}
            </article>

            <aside className="l-col-4 l-col-md-3 l-col-lg-4">
              {loading && <Placeholder.Sidebar />}
              {data && data.node && <Sidebar draft={data.node} />}
            </aside>

            <style jsx>{styles}</style>
          </main>
        )}
      </Query>
    </Protected>
  )
}

export default withRouter(DraftDetail)
