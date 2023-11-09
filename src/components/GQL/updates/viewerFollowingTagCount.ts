import { DataProxy } from 'apollo-cache'
import gql from 'graphql-tag'

import { ViewerFollowingTagCountQuery } from '~/gql/graphql'

const VIEWER_FOLLOWING_TAG_COUNT = gql`
  query ViewerFollowingTagCount {
    viewer {
      id
      following {
        tags(input: { first: 0 }) {
          totalCount
        }
      }
    }
  }
`

export const updateViewerFollowingTagCount = ({
  cache,
  type,
}: {
  cache: DataProxy
  type: 'increment' | 'decrement'
}) => {
  try {
    const cacheData = cache.readQuery<ViewerFollowingTagCountQuery>({
      query: VIEWER_FOLLOWING_TAG_COUNT,
    })

    if (!cacheData || !cacheData.viewer) {
      return
    }

    if (type === 'increment') {
      cacheData.viewer.following.tags.totalCount++
    } else {
      cacheData.viewer.following.tags.totalCount--
    }

    cache.writeQuery({
      query: VIEWER_FOLLOWING_TAG_COUNT,
      data: cacheData,
    })
  } catch (e) {
    console.error(e)
  }
}
