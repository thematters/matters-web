import { DataProxy } from '@apollo/client'

import { UNREAD_NOTICE_COUNT } from '~/components/GQL/queries/notice'

import { UnreadNoticeCount } from '~/components/GQL/queries/__generated__/UnreadNoticeCount'

const update = (cache: DataProxy) => {
  try {
    const cacheData = cache.readQuery<UnreadNoticeCount>({
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

export default update
