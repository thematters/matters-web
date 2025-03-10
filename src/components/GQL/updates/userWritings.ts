import { ApolloCache } from '@apollo/client/cache'

import {
  MomentDigestFeedMomentPrivateFragment,
  MomentDigestFeedMomentPublicFragment,
  MomentState,
  UserCollectionsQuery,
  UserWritingsPublicQuery,
} from '~/gql/graphql'

export const updateUserWritings = ({
  cache,
  targetId,
  userName,
  type,
  momentDigest,
}: {
  cache: ApolloCache<any>
  targetId?: string
  userName: string
  momentDigest?: MomentDigestFeedMomentPublicFragment &
    MomentDigestFeedMomentPrivateFragment
  type: 'pin' | 'unpin' | 'addMoment'
}) => {
  // FIXME: circular dependencies
  const { USER_WRITINGS_PUBLIC } = require('~/views/User/Writings/gql')
  const { USER_COLLECTIONS } = require('~/views/User/Collections/gql')

  let writingsData: UserWritingsPublicQuery | null = null
  try {
    writingsData = cache.readQuery<UserWritingsPublicQuery>({
      query: USER_WRITINGS_PUBLIC,
      variables: { userName },
    })
  } catch (e) {
    //
  }

  let collectionsData: UserCollectionsQuery | null = null
  try {
    collectionsData = cache.readQuery<UserCollectionsQuery>({
      query: USER_COLLECTIONS,
      variables: { userName },
    })
  } catch (e) {
    //
  }

  const writingEdges = writingsData?.user?.writings?.edges || []
  const collectionEdges = collectionsData?.user?.collections?.edges || []
  const writings = writingEdges.map((e) => e.node)
  const articles = writings.filter((a) => a.__typename === 'Article')
  const collecetions = collectionEdges.map((e) => e.node)

  const pinnedWorks = writingsData?.user?.pinnedWorks || []

  let newPinnedWorks = [...pinnedWorks]
  let newWritingEdges = [...writingEdges]

  switch (type) {
    case 'pin':
      if (!targetId) {
        return
      }
      const target = (articles.find((a) => a.id === targetId) ||
        collecetions.find((a) => a.id === targetId))!
      if (
        target.__typename !== 'Article' &&
        target.__typename !== 'Collection'
      ) {
        return
      }
      newPinnedWorks = [...pinnedWorks, target]
      break
    case 'unpin':
      newPinnedWorks = pinnedWorks.filter((a) => a.id !== targetId)
      break
    case 'addMoment':
      if (!momentDigest) {
        return
      }
      newWritingEdges = [
        {
          cursor: momentDigest.id,
          node: {
            ...momentDigest,
            momentState: MomentState.Active,
            liked: false,
            __typename: 'Moment',
          },
          __typename: 'WritingEdge',
        },
        ...writingEdges,
      ]
      break
  }

  if (writingsData) {
    cache.writeQuery({
      query: USER_WRITINGS_PUBLIC,
      variables: { userName },
      data: {
        ...writingsData,
        user: {
          ...writingsData?.user,
          writings: {
            ...writingsData?.user?.writings,
            edges: newWritingEdges,
          },
          pinnedWorks: newPinnedWorks,
        },
      },
    })
  }

  // Only write to collections cache if there are actual changes to make
  if (collectionsData && type === 'pin' && targetId) {
    cache.writeQuery({
      query: USER_COLLECTIONS,
      variables: { userName },
      data: {
        ...collectionsData,
      },
    })
  }
}
