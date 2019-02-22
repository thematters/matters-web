import { DataProxy } from 'apollo-cache'
import gql from 'graphql-tag'

import { ViewerFolloweeCount } from './__generated__/ViewerFolloweeCount'

const VIEWER_FOLLOWEE_COUNT = gql`
  query ViewerFolloweeCount {
    viewer {
      id
      followees(input: { first: 0 }) {
        totalCount
      }
    }
  }
`

export const updateViewerFolloweeCount = ({
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
    //
  }
}
