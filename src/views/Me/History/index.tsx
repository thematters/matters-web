import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import {
  ArticleDigestFeed,
  EmptyHistory,
  Head,
  InfiniteScroll,
  Layout,
  List,
  Spinner,
} from '~/components'
import { QueryError } from '~/components/GQL'

import { analytics, mergeConnections } from '~/common/utils'

import { MeHistoryFeed } from './__generated__/MeHistoryFeed'

const ME_HISTORY_FEED = gql`
  query MeHistoryFeed($after: String) {
    viewer {
      id
      activity {
        history(input: { first: 10, after: $after }) {
          pageInfo {
            startCursor
            endCursor
            hasNextPage
          }
          edges {
            cursor
            node {
              article {
                ...ArticleDigestFeedArticlePublic
                ...ArticleDigestFeedArticlePrivate
              }
            }
          }
        }
      }
    }
  }
  ${ArticleDigestFeed.fragments.article.public}
  ${ArticleDigestFeed.fragments.article.private}
`

const BaseMeHistory = () => {
  const { data, loading, error, fetchMore, refetch } = useQuery<MeHistoryFeed>(
    ME_HISTORY_FEED
  )

  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <QueryError error={error} />
  }

  const connectionPath = 'viewer.activity.history'
  const { edges, pageInfo } = data?.viewer?.activity.history || {}

  if (!edges || edges.length <= 0 || !pageInfo) {
    return <EmptyHistory />
  }

  const loadMore = () => {
    analytics.trackEvent('load_more', {
      type: 'read_history',
      location: edges.length,
    })
    return fetchMore({
      variables: {
        after: pageInfo.endCursor,
      },
      updateQuery: (previousResult, { fetchMoreResult }) =>
        mergeConnections({
          oldData: previousResult,
          newData: fetchMoreResult,
          path: connectionPath,
        }),
    })
  }

  return (
    <InfiniteScroll
      hasNextPage={pageInfo.hasNextPage}
      loadMore={loadMore}
      pullToRefresh={refetch}
    >
      <List>
        {edges.map(({ node, cursor }, i) => (
          <List.Item key={cursor}>
            <ArticleDigestFeed
              article={node.article}
              onClick={() =>
                analytics.trackEvent('click_feed', {
                  type: 'read_history',
                  contentType: 'article',
                  styleType: 'no_cover',
                  location: i,
                })
              }
              onClickAuthor={() => {
                analytics.trackEvent('click_feed', {
                  type: 'read_history',
                  contentType: 'user',
                  styleType: 'subtitle',
                  location: i,
                })
              }}
            />
          </List.Item>
        ))}
      </List>
    </InfiniteScroll>
  )
}

const MeHistory = () => (
  <Layout.Main>
    <Layout.Header
      left={<Layout.Header.BackButton />}
      right={<Layout.Header.Title id="readHistory" />}
    />

    <Head title={{ id: 'readHistory' }} />

    <BaseMeHistory />
  </Layout.Main>
)

export default MeHistory
