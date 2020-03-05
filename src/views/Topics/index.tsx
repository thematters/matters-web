import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import {
  ArticleDigestFeed,
  EmptyArticle,
  Head,
  InfiniteScroll,
  Layout,
  List,
  PageHeader,
  Spinner,
  Translate
} from '~/components'
import { QueryError } from '~/components/GQL'

import { ANALYTICS_EVENTS, FEED_TYPE } from '~/common/enums'
import { analytics, mergeConnections } from '~/common/utils'

import { AllTopics } from './__generated__/AllTopics'

const ALL_TOPICSS = gql`
  query AllTopics($after: String) {
    viewer {
      id
      recommendation {
        topics(input: { first: 10, after: $after }) {
          pageInfo {
            startCursor
            endCursor
            hasNextPage
          }
          edges {
            cursor
            node {
              ...ArticleDigestFeedArticle
            }
          }
        }
      }
    }
  }
  ${ArticleDigestFeed.fragments.article}
`

const Topics = () => {
  const { data, loading, error, fetchMore } = useQuery<AllTopics>(ALL_TOPICSS)

  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <QueryError error={error} />
  }

  const connectionPath = 'viewer.recommendation.topics'
  const { edges, pageInfo } = data?.viewer?.recommendation.topics || {}

  if (!edges || edges.length <= 0 || !pageInfo) {
    return <EmptyArticle />
  }

  const loadMore = () => {
    analytics.trackEvent(ANALYTICS_EVENTS.LOAD_MORE, {
      type: FEED_TYPE.TOPICS,
      location: edges.length
    })
    return fetchMore({
      variables: {
        after: pageInfo.endCursor
      },
      updateQuery: (previousResult, { fetchMoreResult }) =>
        mergeConnections({
          oldData: previousResult,
          newData: fetchMoreResult,
          path: connectionPath
        })
    })
  }

  return (
    <InfiniteScroll hasNextPage={pageInfo.hasNextPage} loadMore={loadMore}>
      <List hasBorder>
        {edges.map(({ node, cursor }, i) => (
          <List.Item key={cursor}>
            <ArticleDigestFeed
              article={node}
              onClick={() =>
                analytics.trackEvent(ANALYTICS_EVENTS.CLICK_FEED, {
                  type: FEED_TYPE.ALL_TOPICS,
                  location: i
                })
              }
            />
          </List.Item>
        ))}
      </List>
    </InfiniteScroll>
  )
}

export default () => (
  <Layout>
    <Head title={{ id: 'allTopics' }} />

    <PageHeader title={<Translate id="allTopics" />} />

    <Topics />
  </Layout>
)
