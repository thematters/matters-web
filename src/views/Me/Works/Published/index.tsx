import { useQuery } from '@apollo/react-hooks'
import { FormattedMessage, useIntl } from 'react-intl'

import { mergeConnections } from '~/common/utils'
import {
  ArticleDigestPublished,
  EmptyArticle,
  Head,
  InfiniteScroll,
  Layout,
  List,
  QueryError,
} from '~/components'
import { MeWorksPublishedFeedQuery } from '~/gql/graphql'

import Placeholder from '../Placeholder'
import WorksTabs from '../WorksTabs'
import { ME_WORKS_PUBLISHED_FEED } from './gql'

export const BaseMeWorksPublished = () => {
  const { data, loading, error, fetchMore } =
    useQuery<MeWorksPublishedFeedQuery>(ME_WORKS_PUBLISHED_FEED)

  if (loading) {
    return <Placeholder />
  }

  if (error) {
    return <QueryError error={error} />
  }

  const connectionPath = 'viewer.articles'
  const { edges, pageInfo } = data?.viewer?.articles || {}

  if (!edges || edges.length <= 0 || !pageInfo) {
    return <EmptyArticle isMe />
  }

  const articleEdges = edges.filter(
    ({ node }) => node.articleState === 'active'
  )

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
    <InfiniteScroll
      hasNextPage={pageInfo.hasNextPage}
      loadMore={loadMore}
      loader={<Placeholder />}
      eof
    >
      <List>
        {articleEdges.map(({ node, cursor }) => (
          <List.Item key={cursor}>
            <ArticleDigestPublished article={node} />
          </List.Item>
        ))}
      </List>
    </InfiniteScroll>
  )
}

const MeWorksPublished = () => {
  const init = useIntl()
  const title = init.formatMessage({
    defaultMessage: 'My Works - Published',
    description: 'src/views/Me/Works/Published/index.tsx',
    id: 'yBCdku',
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

      <BaseMeWorksPublished />
    </Layout.Main>
  )
}

export default MeWorksPublished
