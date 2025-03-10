import { ApolloCache } from '@apollo/client/cache'

import { UNREAD_NOTICE_COUNT } from '~/components/GQL/queries/notice'
import { UnreadNoticeCountQuery } from '~/gql/graphql'

export const updateViewerUnreadNoticeCount = (cache: ApolloCache<any>) => {
  try {
    const cacheData = cache.readQuery<UnreadNoticeCountQuery>({
      query: UNREAD_NOTICE_COUNT,
    })

    if (!cacheData?.viewer?.status?.unreadNoticeCount) {
      return
    }

    cache.writeQuery({
      query: UNREAD_NOTICE_COUNT,
      data: {
        viewer: {
          ...cacheData.viewer,
          status: {
            ...cacheData.viewer.status,
            unreadNoticeCount: 0,
          },
        },
      },
    })
  } catch (e) {
    console.error(e)
  }
}
