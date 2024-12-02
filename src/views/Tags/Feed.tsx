import _get from 'lodash/get'
import { useEffect } from 'react'

import { analytics, mergeConnections } from '~/common/utils'
import {
  EmptyTag,
  Layout,
  QueryError,
  SpinnerBlock,
  TagList,
  usePublicQuery,
} from '~/components'
import { AllTagsHottestQuery } from '~/gql/graphql'

import { ALL_TAGS_HOTTEST, TAG_REACTIVE_DATA } from './gql'

export type FeedType = 'recommended' | 'hottest'

export type FeedQuery = AllTagsHottestQuery

interface Props {
  type: FeedType
}

const Feed = ({ type }: Props) => {
  const isRecommended = type === 'recommended'

  const query = ALL_TAGS_HOTTEST

  const { data, loading, error, fetchMore, client } =
    usePublicQuery<FeedQuery>(query)

  // fetch the latest tag data
  const loadTagReactiveData = (publicData?: FeedQuery) => {
    const publicEdges = publicData?.viewer?.recommendation.tags.edges || []
    const publicIds = publicEdges.map(({ node }) => node.id)

    if (publicIds.length <= 0) {
      return
    }

    client.query({
      query: TAG_REACTIVE_DATA,
      fetchPolicy: 'network-only',
      variables: { ids: publicIds },
    })
  }

  useEffect(() => {
    loadTagReactiveData(data)
  }, [data])

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
        trackingType={isRecommended ? 'all_tags_recommended' : 'all_tags'}
      />
    </Layout.Main.Spacing>
  )
}

export default Feed
