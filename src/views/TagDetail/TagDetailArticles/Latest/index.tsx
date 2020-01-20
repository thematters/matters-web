import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import _get from 'lodash/get'

import { ArticleDigest, InfiniteScroll, Spinner } from '~/components'
import EmptyTagArticles from '~/components/Empty/EmptyTagArticles'
import { QueryError } from '~/components/GQL'
import { useEventListener } from '~/components/Hook'

import {
  ANALYTICS_EVENTS,
  FEED_TYPE,
  REFETCH_TAG_DETAIL_ARTICLES
} from '~/common/enums'
import { analytics, mergeConnections } from '~/common/utils'

import { TagDetailLatestArticles } from './__generated__/TagDetailLatestArticles'

const LATEST_ARTICLES = gql`
  query TagDetailLatestArticles(
    $id: ID!
    $after: String
    $hasArticleDigestActionBookmark: Boolean = true
    $hasArticleDigestActionTopicScore: Boolean = false
  ) {
    node(input: { id: $id }) {
      ... on Tag {
        id
        articles(input: { first: 10, after: $after }) {
          pageInfo {
            startCursor
            endCursor
            hasNextPage
          }
          edges {
            cursor
            node {
              ...FeedDigestArticle
            }
          }
        }
      }
    }
  }
  ${ArticleDigest.Feed.fragments.article}
`

const LatestArticles = ({ id }: { id: string }) => {
  const { data, loading, error, fetchMore, refetch } = useQuery<
    TagDetailLatestArticles
  >(LATEST_ARTICLES, { variables: { id } })

  const sync = ({
    event,
    differences = 0
  }: {
    event: 'add' | 'delete'
    differences?: number
  }) => {
    const { edges: items } = _get(data, 'node.articles', { edges: [] })
    switch (event) {
      case 'add':
        refetch({
          variables: {
            id,
            first: items.length + differences
          }
        })
        break
      case 'delete':
        refetch({
          variables: {
            id,
            first: Math.max(items.length - 1, 0)
          }
        })
        break
    }
  }

  useEventListener(REFETCH_TAG_DETAIL_ARTICLES, sync)

  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <QueryError error={error} />
  }

  if (!data || !data.node || data.node.__typename !== 'Tag') {
    return <EmptyTagArticles />
  }

  const connectionPath = 'node.articles'
  const { edges, pageInfo } = data.node.articles
  const hasArticles = edges && edges.length > 0 && pageInfo

  const loadMore = () => {
    analytics.trackEvent(ANALYTICS_EVENTS.LOAD_MORE, {
      type: FEED_TYPE.TAG_DETAIL,
      location: edges ? edges.length : 0,
      entrance: id
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

  if (!hasArticles) {
    return <EmptyTagArticles />
  }

  return (
    <section>
      <InfiniteScroll hasNextPage={pageInfo.hasNextPage} loadMore={loadMore}>
        <ul>
          {(edges || []).map(({ node, cursor }, i) => (
            <li
              key={cursor}
              onClick={() =>
                analytics.trackEvent(ANALYTICS_EVENTS.CLICK_FEED, {
                  type: FEED_TYPE.TAG_DETAIL,
                  location: i,
                  entrance: id
                })
              }
            >
              <ArticleDigest.Feed
                article={node}
                hasDateTime
                hasBookmark
                hasMoreButton
                inTagDetail
              />
            </li>
          ))}
        </ul>
      </InfiniteScroll>
    </section>
  )
}

export default LatestArticles
