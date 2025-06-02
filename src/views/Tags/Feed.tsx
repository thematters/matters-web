import { analytics, mergeConnections } from '~/common/utils'
import {
  EmptyTag,
  Layout,
  QueryError,
  SpinnerBlock,
  TagList,
  usePublicQuery,
} from '~/components'
import { AllTagsHottestPublicQuery } from '~/gql/graphql'

import { ALL_TAGS_HOTTEST_PUBLIC } from './gql'

export type FeedType = 'recommended' | 'hottest'

export type FeedQuery = AllTagsHottestPublicQuery

interface Props {
  type: FeedType
}

const Feed = ({ type }: Props) => {
  const isRecommended = type === 'recommended'

  const { data, loading, error, fetchMore } = usePublicQuery<FeedQuery>(
    ALL_TAGS_HOTTEST_PUBLIC
  )

  if (loading) {
    return <SpinnerBlock />
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
    <Layout.Main.Spacing hasVertical={false}>
      <TagList.Infinite
        edges={edges}
        pageInfo={pageInfo}
        loadMore={loadMore}
        showEOFMessage={false}
        trackingType={isRecommended ? 'all_tags_recommended' : 'all_tags'}
      />
    </Layout.Main.Spacing>
  )
}

export default Feed
