import { DataProxy } from 'apollo-cache'
import _cloneDeep from 'lodash/cloneDeep'
import _remove from 'lodash/remove'
import _some from 'lodash/some'

import { toGlobalId } from '~/common/utils'
import { Viewer } from '~/components/Context'
import { ArticleDetailPublicQuery } from '~/gql/graphql'

export const updateDonation = ({
  cache,
  id,
  viewer,
  txId,
}: {
  cache: DataProxy
  id: string
  viewer?: Viewer
  txId?: string
}) => {
  const {
    ARTICLE_DETAIL_PUBLIC_BY_NODE_ID,
  } = require('~/views/ArticleDetail/gql')

  try {
    if (!id || !txId) {
      return
    }

    // read from local cache
    const variables = { id }
    const cacheData = _cloneDeep(
      cache.readQuery<ArticleDetailPublicQuery>({
        query: ARTICLE_DETAIL_PUBLIC_BY_NODE_ID,
        variables,
      })
    )

    if (!cacheData || !cacheData.article) {
      return
    }

    // unshift viewer into donations
    const donations = cacheData.article?.donations?.edges || []
    let existed = false
    _remove(donations, (d) => {
      if (!viewer?.id || d.node.sender?.id !== viewer.id) {
        return false
      }
      existed = true
      return true
    })
    const donatorsCount = cacheData.article?.donations?.totalCount || 0

    cacheData.article.donations.totalCount = existed
      ? donatorsCount
      : donatorsCount + 1

    donations.unshift({
      cursor: window.btoa(`arrayconnection:${donations.length}`) || '',
      node: {
        id: toGlobalId({ type: 'Transaction', id: txId }),
        sender: viewer
          ? {
              avatar: viewer.avatar,
              id: viewer.id,
              displayName: viewer.displayName,
              userName: viewer.userName,
              liker: {
                civicLiker: viewer.liker.civicLiker,
                __typename: 'Liker',
              },
              info: {
                badges: viewer.info.badges,
                __typename: 'UserInfo',
              },
              __typename: 'User',
            }
          : null,
        __typename: 'ArticleDonation',
      },
      __typename: 'ArticleDonationEdge',
    })

    cacheData.article.donations.edges = donations

    // write to local cache
    cache.writeQuery({
      query: ARTICLE_DETAIL_PUBLIC_BY_NODE_ID,
      data: cacheData,
      variables,
    })
  } catch (e) {
    console.error(e)
  }
}
