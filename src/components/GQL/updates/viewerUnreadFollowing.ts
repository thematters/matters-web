import { DataProxy } from 'apollo-cache'

import UNREAD_FOLLOWING from '~/components/GQL/queries/unreadFollowing'
import { UnreadFollowingQuery } from '~/gql/graphql'

export const updateViewerUnreadFollowing = (cache: DataProxy) => {
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
