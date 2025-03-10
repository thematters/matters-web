import { ApolloCache } from '@apollo/client/cache'

import UNREAD_FOLLOWING from '~/components/GQL/queries/unreadFollowing'
import { UnreadFollowingQuery } from '~/gql/graphql'

export const updateViewerUnreadFollowing = (cache: ApolloCache<any>) => {
  try {
    const data = cache.readQuery<UnreadFollowingQuery>({
      query: UNREAD_FOLLOWING,
    })

    if (!data?.viewer?.status?.unreadFollowing) {
      return
    }

    cache.writeQuery({
      query: UNREAD_FOLLOWING,
      data: {
        viewer: {
          ...data.viewer,
          status: {
            ...data.viewer.status,
            unreadFollowing: false,
          },
        },
      },
    })
  } catch (e) {
    console.error(e)
  }
}
