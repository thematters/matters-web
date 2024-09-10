import { DataProxy } from '@apollo/client/cache'

import CIRCLE_FOLLOWER_COUNT from '~/components/GQL/queries/circleFollowerCount'
import { CircleFollowerCountQuery } from '~/gql/graphql'

export const updateCircleFollowerCount = ({
  cache,
  type,
  name,
}: {
  cache: DataProxy
  type: 'increment' | 'decrement'
  name: string
}) => {
  try {
    if (!name) {
      return
    }

    const variables = { name }
    const cacheData = cache.readQuery<CircleFollowerCountQuery>({
      query: CIRCLE_FOLLOWER_COUNT,
      variables,
    })

    if (!cacheData || !cacheData.circle) {
      return
    }

    if (type === 'increment') {
      cacheData.circle.followers.totalCount++
    } else {
      cacheData.circle.followers.totalCount--
    }

    cache.writeQuery({
      query: CIRCLE_FOLLOWER_COUNT,
      variables,
      data: cacheData,
    })
  } catch (e) {
    console.error(e)
  }
}
