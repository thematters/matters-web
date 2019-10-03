import { MutationUpdaterFn } from 'react-apollo'

import { UnreadNoticeCount } from '~/components/GQL/queries/__generated__/UnreadNoticeCount'
import { UNREAD_NOTICE_COUNT } from '~/components/GQL/queries/notice'

const update: MutationUpdaterFn<any> = cache => {
  try {
    const cacheData = cache.readQuery<UnreadNoticeCount>({
      query: UNREAD_NOTICE_COUNT
    })

    if (
      !cacheData ||
      !cacheData.viewer ||
      !cacheData.viewer.status ||
      !cacheData.viewer.status.unreadNoticeCount
    ) {
      return
    }

    cache.writeQuery({
      query: UNREAD_NOTICE_COUNT,
      data: {
        viewer: {
          ...cacheData.viewer,
          status: {
            ...cacheData.viewer.status,
            unreadNoticeCount: 0
          }
        }
      }
    })
  } catch (e) {
    console.error(e)
  }
}

export default update
