import { DataProxy } from 'apollo-cache'

import { MeDraftFeedQuery } from '~/gql/graphql'

export const updateUserDrafts = ({
  cache,
  targetId,
  type,
}: {
  cache: DataProxy
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

  let draftEdges = draftsData?.viewer?.drafts.edges || []

  switch (type) {
    case 'remove':
      draftEdges = draftEdges.filter((edge) => edge.node.id !== targetId)
      break
  }

  if (draftsData) {
    cache.writeQuery({
      query: ME_DRAFTS_FEED,
      data: {
        ...draftsData,
        viewer: {
          ...draftsData?.viewer,
          drafts: {
            ...draftsData?.viewer?.drafts,
            edges: draftEdges,
          },
        },
      },
    })
  }
}
