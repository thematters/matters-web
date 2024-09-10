import { DataProxy } from '@apollo/client/cache'

import USER_FOLLOWER_COUNT from '~/components/GQL/queries/userFollowerCount'
import { UserFollowerCountQuery } from '~/gql/graphql'

export const updateUserFollowerCount = ({
  cache,
  type,
  userName,
}: {
  cache: DataProxy
  type: 'increment' | 'decrement'
  userName: string | null
}) => {
  try {
    if (!userName) {
      return
    }

    const variables = { userName }
    const cacheData = cache.readQuery<UserFollowerCountQuery>({
      query: USER_FOLLOWER_COUNT,
      variables,
    })

    if (!cacheData || !cacheData.user) {
      return
    }

    if (type === 'increment') {
      cacheData.user.followers.totalCount++
    } else {
      cacheData.user.followers.totalCount--
    }

    cache.writeQuery({
      query: USER_FOLLOWER_COUNT,
      variables,
      data: cacheData,
    })
  } catch (e) {
    console.error(e)
  }
}
