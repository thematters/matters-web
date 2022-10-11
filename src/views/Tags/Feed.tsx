import _get from 'lodash/get'

import {
  EmptyTag,
  InfiniteScroll,
  QueryError,
  Spinner,
  TagDigest,
  usePublicQuery,
  // useResponsive,
} from '~/components'

import { analytics, mergeConnections, toPath } from '~/common/utils'

import { ALL_TAGS_HOTTEST } from './gql'
// import SidebarTags from './Sidebar'
import styles from './styles.css'

import { AllTagsHottest } from './__generated__/AllTagsHottest'

export type FeedType = 'recommended' | 'hottest'

// export type FeedQuery = AllTagsRecommended | AllTagsHottest
export type FeedQuery = AllTagsHottest

interface Props {
  type: FeedType
}

const Feed = ({ type }: Props) => {
  // const isLargeUp = useResponsive('lg-up')

  const isRecommended = type === 'recommended'

  // const query = isRecommended ? ALL_TAGS_RECOMMENDED : ALL_TAGS_HOTTEST
  const query = ALL_TAGS_HOTTEST

  const { data, loading, error, fetchMore, refetch } =
    usePublicQuery<FeedQuery>(query)

  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <QueryError error={error} />
  }

  const connectionPath = 'viewer.recommendation.tags'
  const { edges, pageInfo } = data?.viewer?.recommendation.tags || {}

  if (!edges || edges.length <= 0 || !pageInfo) {
    return <EmptyTag />
  }

  const trackingType = isRecommended ? 'all_tags_recommended' : 'all_tags'
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
        {edges.map(({ node: tag }, i) => (
          <li key={tag.id}>
            <TagDigest.Feed
              tag={tag}
              spacing={['xtight', 'xtight']}
              href={
                toPath({
                  page: 'tagDetail',
                  tag, // : node,
                }).href
              }
              onClick={() =>
                analytics.trackEvent('click_feed', {
                  type: trackingType,
                  contentType: 'tag',
                  location: i,
                  id: tag.id,
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
