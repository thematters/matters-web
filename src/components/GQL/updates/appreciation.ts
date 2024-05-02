import { DataProxy } from 'apollo-cache'
import _cloneDeep from 'lodash/cloneDeep'
import _some from 'lodash/some'

import { ArticleDetailPublicQuery } from '~/gql/graphql'

export const updateAppreciation = ({
  cache,
  left,
  shortHash,
  total,
  viewer,
  canSuperLike,
}: {
  cache: DataProxy
  left: number
  shortHash: string
  total: number
  viewer: any
  canSuperLike?: boolean
}) => {
  const { ARTICLE_DETAIL_PUBLIC } = require('~/views/ArticleDetail/gql')

  try {
    if (!shortHash) {
      return
    }

    // read from local cache
    const cacheData = _cloneDeep(
      cache.readQuery<ArticleDetailPublicQuery>({
        query: ARTICLE_DETAIL_PUBLIC,
        variables: { shortHash },
      })
    )

    if (!cacheData?.article) {
      return
    }

    // update counts
    const article = cacheData.article as NonNullable<
      ArticleDetailPublicQuery['article']
    > & { __typename: 'Article' }
    article.appreciateLeft = left
    article.likesReceivedTotal = total
    article.hasAppreciate = true

    // update SuperLike
    if (typeof canSuperLike === 'boolean') {
      article.canSuperLike = canSuperLike
    }

    // write to local cache
    cache.writeQuery({
      query: ARTICLE_DETAIL_PUBLIC,
      data: cacheData,
      variables: { shortHash },
    })
  } catch (e) {
    console.error(e)
  }
}
