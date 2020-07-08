import { DataProxy } from 'apollo-cache'

import TAG_ARTICLES_COUNT from '~/components/GQL/queries/tagArticlesCount'

import { ERROR_CODES } from '~/common/enums'

import { TagArticlesCount } from '~/components/GQL/queries/__generated__/TagArticlesCount'

const update = ({
  cache,
  id,
  type,
}: {
  cache: DataProxy
  id: string
  type: 'increment' | 'decrement'
}) => {
  try {
    if (!id) {
      return
    }

    const variables = { id }
    const cacheData = cache.readQuery<TagArticlesCount>({
      query: TAG_ARTICLES_COUNT,
      variables,
    })

    if (!cacheData || !cacheData.node || cacheData.node.__typename !== 'Tag') {
      return
    }

    if (type === 'increment') {
      cacheData.node.articles.totalCount++
    } else {
      cacheData.node.articles.totalCount--
    }

    cache.writeQuery({
      query: TAG_ARTICLES_COUNT,
      variables,
      data: cacheData,
    })
  } catch (e) {
    if (e.message.startsWith("Can't find field")) {
      console.warn(ERROR_CODES.QUERY_FIELD_NOT_FOUND)
    } else {
      console.error(e)
    }
  }
}

export default update
