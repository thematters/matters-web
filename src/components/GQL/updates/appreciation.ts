import { DataProxy } from 'apollo-cache'
import _cloneDeep from 'lodash/cloneDeep'
import _some from 'lodash/some'
import { ARTICLE_DETAIL_PUBLIC } from '~/views/ArticleDetail/gql'

import { ERROR_CODES } from '~/common/enums'

import { ArticleDetailPublic } from '~/views/ArticleDetail/__generated__/ArticleDetailPublic'

const update = ({
  cache,
  left,
  mediaHash,
  total,
  viewer,
}: {
  cache: DataProxy
  left: number
  mediaHash: string
  total: number
  viewer: any
}) => {
  try {
    if (!mediaHash) {
      return
    }

    const variables = { mediaHash }
    const cacheData = _cloneDeep(
      cache.readQuery<ArticleDetailPublic>({
        query: ARTICLE_DETAIL_PUBLIC,
        variables,
      })
    )

    if (!cacheData || !cacheData.article) {
      return
    }

    cacheData.article.appreciateLeft = left
    cacheData.article.appreciationsReceivedTotal = total
    cacheData.article.hasAppreciate = true

    // inject viewer into appreciators
    const appreciators = cacheData.article?.received?.edges || []
    const appreciatorsCount = cacheData.article?.received?.totalCount || 0
    const hasApprecaitor = _some(appreciators, {
      node: { sender: { id: viewer.id } },
    })
    if (!hasApprecaitor) {
      cacheData.article.received.totalCount = appreciatorsCount + 1
      appreciators.push({
        cursor: window.btoa(`arrayconnection:${appreciators.length}`) || '',
        node: {
          sender: {
            avatar: viewer.avatar,
            id: viewer.id,
            liker: {
              civicLiker: viewer.liker.civicLiker,
              __typename: 'Liker',
            },
            __typename: 'User',
          },
          __typename: 'Appreciation',
        },
        __typename: 'AppreciationEdge',
      })
      cacheData.article.received.edges = appreciators
    }

    cache.writeQuery({
      query: ARTICLE_DETAIL_PUBLIC,
      data: cacheData,
      variables,
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
