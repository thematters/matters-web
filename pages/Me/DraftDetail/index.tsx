import gql from 'graphql-tag'
import { withRouter, WithRouterProps } from 'next/router'
import { useContext, useEffect } from 'react'
import { Query, QueryResult } from 'react-apollo'

import { fragments as EditorFragments } from '~/components/Editor/fragments'
import { HeaderContext } from '~/components/GlobalHeader/Context'
import { Placeholder } from '~/components/Placeholder'

import { getQuery } from '~/common/utils'

import { DraftDetailQuery } from './__generated__/DraftDetailQuery'
import DraftContent from './Content'
import Sidebar from './Sidebar'
import styles from './styles.css'

const DRAFT_DETAIL = gql`
  query DraftDetailQuery($id: ID!) {
    node(input: { id: $id }) {
      id
      ... on Draft {
        ...EditorDraft
        ...DraftSidebarDraft
      }
    }
  }
  ${EditorFragments.draft}
  ${Sidebar.fragments.draft}
`

const DraftDetail: React.FC<WithRouterProps> = ({ router }) => {
  const id = getQuery({ router, key: 'id' })

  if (!id) {
    return <span>Empty</span> // TODO
  }

  const { updateHeaderState } = useContext(HeaderContext)

  useEffect(() => {
    updateHeaderState({ type: 'draft', saved: true })

    return () => updateHeaderState({ type: 'default' })
  }, [])

  return (
    <Query query={DRAFT_DETAIL} variables={{ id }}>
      {({ data, loading, error }: QueryResult & { data: DraftDetailQuery }) => (
        <main className="l-row">
          <article className="l-col-4 l-col-md-5 l-col-lg-8">
            {loading ? (
              <Placeholder.ArticleDetail />
            ) : (
              <DraftContent draft={data.node} />
            )}
          </article>

          <aside className="l-col-4 l-col-md-3 l-col-lg-4">
            {loading ? <Placeholder.Sidebar /> : <Sidebar draft={data.node} />}
          </aside>

          <style jsx>{styles}</style>
        </main>
      )}
    </Query>
  )
}

export default withRouter(DraftDetail)
