import { ApolloCache } from '@apollo/client/cache'

import { MeDraftFeedQuery } from '~/gql/graphql'

export const updateUserDrafts = ({
  cache,
  targetId,
  type,
}: {
  cache: ApolloCache<any>
  targetId?: string
  type: 'remove' | 'add'
}) => {
  // FIXME: circular dependencies
  const { ME_DRAFTS_FEED } = require('~/views/Me/Drafts/gql')

  let draftsData: MeDraftFeedQuery | null = null
  try {
    draftsData = cache.readQuery<MeDraftFeedQuery>({ query: ME_DRAFTS_FEED })
  } catch (e) {
    //
  }

  if (!draftsData) {
    return
  }

  const originalDraftEdges = draftsData?.viewer?.drafts.edges || []

  // Create a new immutable array of draft edges
  let updatedDraftEdges = [...originalDraftEdges]

  switch (type) {
    case 'remove':
      updatedDraftEdges = updatedDraftEdges.filter(
        (edge) => edge.node.id !== targetId
      )
      break
  }

  cache.writeQuery({
    query: ME_DRAFTS_FEED,
    data: {
      ...draftsData,
      viewer: {
        ...draftsData?.viewer,
        drafts: {
          ...draftsData?.viewer?.drafts,
          edges: updatedDraftEdges,
        },
      },
    },
  })
}
