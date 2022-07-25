import _get from 'lodash/get'

import {
  EmptyTag,
  InfiniteScroll,
  QueryError,
  Spinner,
  TagDigest,
  usePublicQuery,
} from '~/components'

import { analytics, mergeConnections, toPath } from '~/common/utils'

import { ALL_TAGS_HOTTEST, ALL_TAGS_RECOMMENDED } from './gql'
import styles from './styles.css'

import {
  AllTagsHottest,
  AllTagsHottest_viewer_recommendation_tags_edges_node_recommended_edges,
} from './__generated__/AllTagsHottest'
import {
  AllTagsRecommended,
  AllTagsRecommended_viewer_recommendation_tags_edges_node_recommended_edges,
} from './__generated__/AllTagsRecommended'

export type FeedType = 'recommended' | 'hottest'

export type FeedQuery = AllTagsRecommended | AllTagsHottest

export type FeedEdges =
  | AllTagsHottest_viewer_recommendation_tags_edges_node_recommended_edges
  | AllTagsRecommended_viewer_recommendation_tags_edges_node_recommended_edges

interface Props {
  type: FeedType
}

const Feed = ({ type }: Props) => {
  const isRecommended = type === 'recommended'

  const query = isRecommended ? ALL_TAGS_RECOMMENDED : ALL_TAGS_HOTTEST

  const { data, loading, error, fetchMore, refetch } =
    usePublicQuery<FeedQuery>(query)

  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <QueryError error={error} />
  }

  // TODO: revise queries
  const connectionPath = 'viewer.recommendation.tags.edges.0.node.recommended'
  const tag =
    data?.viewer?.recommendation.tags.edges &&
    data?.viewer?.recommendation.tags.edges[0]

  const edges = _get(
    tag,
    isRecommended ? 'node.recommended.edges' : 'node.recommended.edges',
    []
  ) as FeedEdges[]

  const pageInfo = _get(
    tag,
    isRecommended ? 'node.recommended.pageInfo' : 'node.recommended.pageInfo',
    []
  ) as any

  if (!edges || edges.length <= 0 || !pageInfo) {
    return <EmptyTag />
  }

  const trackingType = isRecommended
    ? 'all_tags_recommended'
    : 'all_tags_hottest'
  const loadMore = () => {
    analytics.trackEvent('load_more', {
      type: trackingType,
      location: edges.length,
    })
    return fetchMore({
      variables: { after: pageInfo.endCursor },
      updateQuery: (previousResult, { fetchMoreResult }) =>
        mergeConnections({
          oldData: previousResult,
          newData: fetchMoreResult,
          path: connectionPath,
          dedupe: true,
        }),
    })
  }

  return (
    <InfiniteScroll
      hasNextPage={pageInfo.hasNextPage}
      loadMore={loadMore}
      pullToRefresh={refetch}
    >
      <ul>
        {edges.map(({ node }, i) => (
          <li key={node.id}>
            <TagDigest.Feed
              tag={node}
              spacing={['xtight', 'xtight']}
              {...toPath({
                page: 'tagDetail',
                id: node.id,
              })}
              onClick={() =>
                analytics.trackEvent('click_feed', {
                  type: trackingType,
                  contentType: 'tag',
                  location: i,
                  id: node.id,
                })
              }
            />
          </li>
        ))}
      </ul>

      <style jsx>{styles}</style>
    </InfiniteScroll>
  )
}

export default Feed
