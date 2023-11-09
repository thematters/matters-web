import { DataProxy } from 'apollo-cache'
import _cloneDeep from 'lodash/cloneDeep'
import _some from 'lodash/some'

import { ArticleDetailPublicByNodeIdQuery } from '~/gql/graphql'

export const updateAppreciation = ({
  cache,
  left,
  id,
  total,
  viewer,
  canSuperLike,
}: {
  cache: DataProxy
  left: number
  id: string
  total: number
  viewer: any
  canSuperLike?: boolean
}) => {
  const {
    ARTICLE_DETAIL_PUBLIC_BY_NODE_ID,
  } = require('~/views/ArticleDetail/gql')

  try {
    if (!id) {
      return
    }

    // read from local cache
    const cacheData = _cloneDeep(
      cache.readQuery<ArticleDetailPublicByNodeIdQuery>({
        query: ARTICLE_DETAIL_PUBLIC_BY_NODE_ID,
        variables: { id },
      })
    )

    if (!cacheData?.article) {
      return
    }

    // update counts
    const article = cacheData.article as NonNullable<
      ArticleDetailPublicByNodeIdQuery['article']
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
      query: ARTICLE_DETAIL_PUBLIC_BY_NODE_ID,
      data: cacheData,
      variables: { id },
    })
  } catch (e) {
    console.error(e)
  }
}
