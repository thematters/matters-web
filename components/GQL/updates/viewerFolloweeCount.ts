import { DataProxy } from 'apollo-cache'

import { ViewerFolloweeCount } from '~/components/GQL/queries/__generated__/ViewerFolloweeCount'
import VIEWER_FOLLOWEE_COUNT from '~/components/GQL/queries/followeeCount'

const update = ({
  cache,
  type
}: {
  cache: DataProxy
  type: 'increment' | 'decrement'
}) => {
  try {
    const cacheData = cache.readQuery<ViewerFolloweeCount>({
      query: VIEWER_FOLLOWEE_COUNT
    })

    if (!cacheData || !cacheData.viewer) {
      return
    }

    if (type === 'increment') {
      cacheData.viewer.followees.totalCount++
    } else {
      cacheData.viewer.followees.totalCount--
    }

    cache.writeQuery({
      query: VIEWER_FOLLOWEE_COUNT,
      data: cacheData
    })
  } catch (e) {
    console.error(e)
  }
}

export default update
