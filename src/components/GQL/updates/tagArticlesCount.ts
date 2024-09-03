import { DataProxy } from '@apollo/client/cache'
import _cloneDeep from 'lodash/cloneDeep'

import TAG_ARTICLES_COUNT from '~/components/GQL/queries/tagArticlesCount'
import { TagArticlesCountQuery } from '~/gql/graphql'

export const updateTagArticlesCount = ({
  cache,
  id,
  count = 1,
  type,
}: {
  cache: DataProxy
  id: string
  count?: number
  type: 'increment' | 'decrement'
}) => {
  try {
    if (!id) {
      return
    }

    const variables = { id }
    const cacheData = cache.readQuery<TagArticlesCountQuery>({
      query: TAG_ARTICLES_COUNT,
      variables,
    })

    const data = _cloneDeep(cacheData)
    if (data?.node?.__typename !== 'Tag') {
      return
    }

    if (type === 'increment') {
      data.node.articles.totalCount += count
    } else {
      data.node.articles.totalCount -= count
    }

    cache.writeQuery({
      query: TAG_ARTICLES_COUNT,
      variables,
      data,
    })
  } catch (e) {
    console.error(e)
  }
}
