import _get from 'lodash/get'

import { analytics, mergeConnections, toPath } from '~/common/utils'
import {
  EmptyTag,
  InfiniteScroll,
  QueryError,
  ResponsiveWrapper,
  Spinner,
  TagDigest,
  usePublicQuery,
} from '~/components'
import { AllTagsHottestQuery } from '~/gql/graphql'

import { ALL_TAGS_HOTTEST } from './gql'
import styles from './styles.module.css'

export type FeedType = 'recommended' | 'hottest'

export type FeedQuery = AllTagsHottestQuery

interface Props {
  type: FeedType
}

const Feed = ({ type }: Props) => {
  const isRecommended = type === 'recommended'

  const query = ALL_TAGS_HOTTEST

  const { data, loading, error, fetchMore } = usePublicQuery<FeedQuery>(query)

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
    <InfiniteScroll hasNextPage={pageInfo.hasNextPage} loadMore={loadMore}>
      <ResponsiveWrapper>
        <ul className={styles.list}>
          {edges.map(({ node: tag }, i) => (
            <li key={tag.id} className={styles.listItem}>
              <TagDigest.Feed
                tag={tag}
                spacing={['xtight', 0]}
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
      </ResponsiveWrapper>
    </InfiniteScroll>
  )
}

export default Feed
