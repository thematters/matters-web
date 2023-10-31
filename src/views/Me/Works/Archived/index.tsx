import { useQuery } from '@apollo/react-hooks'
import { FormattedMessage, useIntl } from 'react-intl'

import { mergeConnections } from '~/common/utils'
import {
  ArticleDigestArchived,
  Head,
  InfiniteScroll,
  Layout,
  List,
  QueryError,
} from '~/components'
import { MeWorksArchivedFeedQuery } from '~/gql/graphql'

import Placeholder from '../Placeholder'
import WorksTabs from '../WorksTabs'
import { ME_WORKS_ARCHIVED_FEED } from './gql'

export const BaseMeWorksArchived = () => {
  const { data, loading, error, fetchMore } =
    useQuery<MeWorksArchivedFeedQuery>(ME_WORKS_ARCHIVED_FEED)

  if (loading) {
    return <Placeholder />
  }

  if (error) {
    return <QueryError error={error} />
  }

  const connectionPath = 'viewer.articles'
  const { edges, pageInfo } = data?.viewer?.articles || {}

  if (!edges || edges.length <= 0 || !pageInfo) {
    return null
  }

  const loadMore = () =>
    fetchMore({
      variables: { after: pageInfo.endCursor },
      updateQuery: (previousResult, { fetchMoreResult }) =>
        mergeConnections({
          oldData: previousResult,
          newData: fetchMoreResult,
          path: connectionPath,
        }),
    })

  return (
    <InfiniteScroll hasNextPage={pageInfo.hasNextPage} loadMore={loadMore} eof>
      <List>
        {edges.map(({ node, cursor }) => (
          <List.Item key={cursor}>
            <ArticleDigestArchived article={node} />
          </List.Item>
        ))}
      </List>
    </InfiniteScroll>
  )
}

const MeWorksArchived = () => {
  const init = useIntl()
  const title = init.formatMessage({
    defaultMessage: 'My Works - Archived',
    description: 'src/views/Me/Works/Archived/index.tsx',
    id: 'YgZOAm',
  })

  return (
    <Layout.Main>
      <Layout.Header
        left={
          <Layout.Header.Title>
            <FormattedMessage defaultMessage="My Works" id="ai7kS4" />
          </Layout.Header.Title>
        }
      />

      <Head title={title} />

      <WorksTabs />

      <BaseMeWorksArchived />
    </Layout.Main>
  )
}

export default MeWorksArchived
