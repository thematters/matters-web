import { DataProxy } from '@apollo/client/cache'

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
  cache: DataProxy
  targetId?: string
  userName: string
  momentDigest?: MomentDigestFeedMomentPublicFragment &
    MomentDigestFeedMomentPrivateFragment
  type: 'pin' | 'unpin' | 'archive' | 'addMoment'
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

  let writingEdges = writingsData?.user?.writings?.edges || []
  const collectionEdges = collectionsData?.user?.collections?.edges || []
  const writings = writingEdges.map((e) => e.node)
  const articles = writings.filter((a) => a.__typename === 'Article')
  const collecetions = collectionEdges.map((e) => e.node)

  let pinnedWorks = writingsData?.user?.pinnedWorks || []

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
      pinnedWorks = [...pinnedWorks, target]
      break
    case 'unpin':
      pinnedWorks = pinnedWorks.filter((a) => a.id !== targetId)
      break
    case 'archive':
      // remove pinned article if it's archived
      pinnedWorks = pinnedWorks.filter((a) => a.id !== targetId)
      break
    case 'addMoment':
      if (!momentDigest) {
        return
      }
      writingEdges = [
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
            edges: [...writingEdges],
          },
          pinnedWorks,
        },
      },
    })
  }

  if (collectionsData) {
    cache.writeQuery({
      query: USER_COLLECTIONS,
      variables: { userName },
      data: {
        ...collectionsData,
      },
    })
  }
}
