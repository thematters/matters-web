import { useQuery } from '@apollo/client'

import { mergeConnections } from '~/common/utils'
import { DraftDetailViewerQueryQuery } from '~/gql/graphql'
import { DRAFT_DETAIL_VIEWER } from '~/views/Me/DraftDetail/gql'

export type OptionTab = 'contentAndLayout' | 'settings'

export const getOptionTabByType = (type?: string): OptionTab => {
  if (
    type === 'campaign' ||
    type === 'tags' ||
    type === 'connections' ||
    type === 'collections' ||
    type === '' ||
    type === undefined
  ) {
    return 'contentAndLayout'
  }
  return 'settings'
}

export const useViewer = () => {
  const {
    data: viewerData,
    loading: viewerLoading,
    fetchMore,
  } = useQuery<DraftDetailViewerQueryQuery>(DRAFT_DETAIL_VIEWER, {
    fetchPolicy: 'network-only',
  })

  const ownCircles = viewerData?.viewer?.ownCircles || undefined
  const appliedCampaigns = viewerData?.viewer?.campaigns.edges?.map(
    (e) => e.node
  )
  const ownCollections = viewerData?.viewer?.collections.edges?.map(
    (e) => e.node
  )

  const loadMoreCollections = () => {
    const connectionPath = 'viewer.collections'
    return fetchMore({
      variables: {
        collectionsAfter: viewerData?.viewer?.collections?.pageInfo?.endCursor,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        return mergeConnections({
          oldData: previousResult,
          newData: fetchMoreResult,
          path: connectionPath,
        })
      },
    })
  }

  return {
    viewerData,
    ownCircles,
    ownCollections,
    appliedCampaigns,
    loading: viewerLoading,
    loadMoreCollections,
  }
}
