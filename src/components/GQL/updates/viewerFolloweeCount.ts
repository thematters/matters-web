import { DataProxy } from '@apollo/client/cache'
import gql from 'graphql-tag'

import { ViewerFolloweeCountQuery } from '~/gql/graphql'

const VIEWER_FOLLOWEE_COUNT = gql`
  query ViewerFolloweeCount {
    viewer {
      id
      following {
        users(input: { first: 0 }) {
          totalCount
        }
      }
    }
  }
`

export const updateViewerFolloweeCount = ({
  cache,
  type,
}: {
  cache: DataProxy
  type: 'increment' | 'decrement'
}) => {
  try {
    const cacheData = cache.readQuery<ViewerFolloweeCountQuery>({
      query: VIEWER_FOLLOWEE_COUNT,
    })

    if (!cacheData || !cacheData.viewer) {
      return
    }

    if (type === 'increment') {
      cacheData.viewer.following.users.totalCount++
    } else {
      cacheData.viewer.following.users.totalCount--
    }

    cache.writeQuery({
      query: VIEWER_FOLLOWEE_COUNT,
      data: cacheData,
    })
  } catch (e) {
    console.error(e)
  }
}
