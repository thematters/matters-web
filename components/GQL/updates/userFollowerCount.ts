import { DataProxy } from 'apollo-cache'

import { UserFollowerCount } from '~/components/GQL/queries/__generated__/UserFollowerCount'
import USER_FOLLOWER_COUNT from '~/components/GQL/queries/userFollowerCount'

const update = ({
  cache,
  type,
  userName
}: {
  cache: DataProxy
  type: 'increment' | 'decrement'
  userName: string
}) => {
  try {
    if (!userName) {
      return
    }

    const variables = { userName }
    const cacheData = cache.readQuery<UserFollowerCount>({
      query: USER_FOLLOWER_COUNT,
      variables
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
      data: cacheData
    })
  } catch (e) {
    console.error(e)
  }
}

export default update
