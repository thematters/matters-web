import { DataProxy } from 'apollo-cache'
import gql from 'graphql-tag'

import { ERROR_CODES } from '~/common/enums'
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
    if ((e as any).message.startsWith("Can't find field")) {
      console.warn(ERROR_CODES.QUERY_FIELD_NOT_FOUND)
    } else {
      console.error(e)
    }
  }
}
