import { DataProxy } from 'apollo-cache'

import { UnreadFollowing } from '~/components/GQL/queries/__generated__/UnreadFollowing'
import UNREAD_FOLLOWING from '~/components/GQL/queries/unreadFollowing'

const update = (cache: DataProxy) => {
  try {
    const data = cache.readQuery<UnreadFollowing>({
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

export default update
