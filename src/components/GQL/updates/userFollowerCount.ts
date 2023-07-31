import { DataProxy } from 'apollo-cache'

import { ERROR_CODES } from '~/common/enums'
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
    if ((e as any).message.startsWith("Can't find field")) {
      console.warn(ERROR_CODES.QUERY_FIELD_NOT_FOUND)
    } else {
      console.error(e)
    }
  }
}
