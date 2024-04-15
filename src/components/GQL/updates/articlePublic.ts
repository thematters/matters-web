import { DataProxy } from 'apollo-cache'

import { isMediaHashPossiblyValid, toGlobalId } from '~/common/utils'
import {
  ArticleAvailableTranslationsQuery,
  ArticleDetailPublicQuery,
  UserLanguage,
} from '~/gql/graphql'

export const updateArticlePublic = ({
  cache,
  articleId,
  mediaHash,
  routerLang,
  type,
}: {
  cache: DataProxy
  articleId: string
  mediaHash: string
  routerLang: UserLanguage
  type: 'deleteComment' | 'addComment'
}) => {
  // FIXME: circular dependencies
  const {
    ARTICLE_DETAIL_PUBLIC,
    ARTICLE_DETAIL_PUBLIC_BY_NODE_ID,
    ARTICLE_AVAILABLE_TRANSLATIONS,
    ARTICLE_AVAILABLE_TRANSLATIONS_BY_NODE_ID,
  } = require('~/views/ArticleDetail/gql.ts')

  const isQueryByHash = !!(
    mediaHash &&
    isMediaHashPossiblyValid(mediaHash) &&
    !articleId
  )

  try {
    const TRANSLATIONS_QUERY_GQL = isQueryByHash
      ? ARTICLE_AVAILABLE_TRANSLATIONS
      : ARTICLE_AVAILABLE_TRANSLATIONS_BY_NODE_ID
    const translationQueryVariables = isQueryByHash
      ? { mediaHash }
      : { id: toGlobalId({ type: 'Article', id: articleId }) }

    const translationResult =
      cache.readQuery<ArticleAvailableTranslationsQuery>({
        query: TRANSLATIONS_QUERY_GQL,
        variables: translationQueryVariables,
      })

    if (!translationResult) {
      return
    }

    const includeTranslation =
      !!routerLang &&
      (translationResult?.article?.availableTranslations || []).includes(
        routerLang
      )

    const DETAIL_QUERY_GQL = isQueryByHash
      ? ARTICLE_DETAIL_PUBLIC
      : ARTICLE_DETAIL_PUBLIC_BY_NODE_ID
    const detailQueryVariables = isQueryByHash
      ? {
          mediaHash,
          language: routerLang || UserLanguage.ZhHant,
          includeTranslation,
        }
      : {
          id: toGlobalId({ type: 'Article', id: articleId }),
          language: routerLang,
          includeTranslation,
        }

    const data = cache.readQuery<ArticleDetailPublicQuery>({
      query: DETAIL_QUERY_GQL,
      variables: detailQueryVariables,
    })

    if (data?.article?.__typename !== 'Article') {
      return
    }

    let commentCount = data.article.comments.totalCount
    switch (type) {
      case 'addComment':
        commentCount += 1
        break
      case 'deleteComment':
        commentCount -= 1
        break
    }

    cache.writeQuery({
      query: DETAIL_QUERY_GQL,
      variables: detailQueryVariables,
      data: {
        article: {
          ...data.article,
          comments: {
            ...data.article.comments,
            totalCount: commentCount,
          },
        },
      },
    })
  } catch (e) {
    console.error(e)
  }
}
