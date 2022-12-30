import { DataProxy } from 'apollo-cache'

import { ERROR_CODES } from '~/common/enums'
import { CircleFollowerCount } from '~/components/GQL/queries/__generated__/CircleFollowerCount'
import CIRCLE_FOLLOWER_COUNT from '~/components/GQL/queries/circleFollowerCount'

const update = ({
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
    const cacheData = cache.readQuery<CircleFollowerCount>({
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
    if ((e as any).message.startsWith("Can't find field")) {
      console.warn(ERROR_CODES.QUERY_FIELD_NOT_FOUND)
    } else {
      console.error(e)
    }
  }
}

export default update
