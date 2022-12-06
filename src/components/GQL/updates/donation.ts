import { DataProxy } from 'apollo-cache'
import _cloneDeep from 'lodash/cloneDeep'
import _remove from 'lodash/remove'
import _some from 'lodash/some'
import { ARTICLE_DETAIL_PUBLIC_BY_NODE_ID } from '~/views/ArticleDetail/gql'

import { ERROR_CODES } from '~/common/enums'

import { ArticleDetailPublic } from '~/views/ArticleDetail/__generated__/ArticleDetailPublic'

const update = ({
  cache,
  id,
  viewer,
}: {
  cache: DataProxy
  id: string
  viewer: any
}) => {
  try {
    if (!id) {
      return
    }

    // read from local cache
    const variables = { id }
    const cacheData = _cloneDeep(
      cache.readQuery<ArticleDetailPublic>({
        query: ARTICLE_DETAIL_PUBLIC_BY_NODE_ID,
        variables,
      })
    )

    if (!cacheData || !cacheData.article) {
      return
    }

    // unshift viewer into donations
    const donators = cacheData.article?.donations?.edges || []
    let existed = false
    _remove(donators, (d) => {
      if (d.node.id !== viewer.id) {
        return false
      }
      existed = true
      return true
    })
    const donatorsCount = cacheData.article?.donations?.totalCount || 0

    cacheData.article.donations.totalCount = existed
      ? donatorsCount
      : donatorsCount + 1

    donators.unshift({
      cursor: window.btoa(`arrayconnection:${donators.length}`) || '',
      node: {
        avatar: viewer.avatar,
        id: viewer.id,
        displayName: viewer.displayName,
        liker: {
          civicLiker: viewer.liker.civicLiker,
          __typename: 'Liker',
        },
        info: {
          badges: viewer.info.badges,
          __typename: 'UserInfo',
        },
        __typename: 'User',
      },
      __typename: 'UserEdge',
    })

    cacheData.article.donations.edges = donators

    // write to local cache
    cache.writeQuery({
      query: ARTICLE_DETAIL_PUBLIC_BY_NODE_ID,
      data: cacheData,
      variables,
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
