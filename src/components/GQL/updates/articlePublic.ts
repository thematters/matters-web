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
    if (isQueryByHash) {
      const translationResultByHash =
        cache.readQuery<ArticleAvailableTranslationsQuery>({
          query: ARTICLE_AVAILABLE_TRANSLATIONS,
          variables: { mediaHash },
        })

      if (!translationResultByHash) {
        return
      }

      const includeTranslation =
        !!routerLang &&
        (
          translationResultByHash?.article?.availableTranslations || []
        ).includes(routerLang)

      const resultByHash = cache.readQuery<ArticleDetailPublicQuery>({
        query: ARTICLE_DETAIL_PUBLIC,
        variables: {
          mediaHash,
          language: routerLang || UserLanguage.ZhHant,
          includeTranslation,
        },
      })

      const data = resultByHash

      if (data?.article?.__typename !== 'Article') {
        return
      }

      let commentCount = data.article.commentCount
      switch (type) {
        case 'addComment':
          commentCount += 1
          break
        case 'deleteComment':
          commentCount -= 1
          break
      }

      cache.writeQuery({
        query: ARTICLE_DETAIL_PUBLIC,
        variables: {
          mediaHash,
          language: routerLang || UserLanguage.ZhHant,
          includeTranslation,
        },
        data: {
          article: {
            ...data.article,
            commentCount,
          },
        },
      })

      return
    }

    const translationResultByNodeId =
      cache.readQuery<ArticleAvailableTranslationsQuery>({
        query: ARTICLE_AVAILABLE_TRANSLATIONS_BY_NODE_ID,
        variables: { id: toGlobalId({ type: 'Article', id: articleId }) },
      })

    if (!translationResultByNodeId) {
      return
    }

    const includeTranslation =
      !!routerLang &&
      (
        translationResultByNodeId?.article?.availableTranslations || []
      ).includes(routerLang)

    const resultByNodeId = cache.readQuery<ArticleDetailPublicQuery>({
      query: ARTICLE_DETAIL_PUBLIC_BY_NODE_ID,
      variables: {
        id: toGlobalId({ type: 'Article', id: articleId }),
        language: routerLang,
        includeTranslation,
      },
    })

    const data = resultByNodeId

    if (data?.article?.__typename !== 'Article') {
      return
    }

    let commentCount = data.article.commentCount
    switch (type) {
      case 'addComment':
        commentCount += 1
        break
      case 'deleteComment':
        commentCount -= 1
        break
    }

    cache.writeQuery({
      query: ARTICLE_DETAIL_PUBLIC_BY_NODE_ID,
      variables: {
        id: toGlobalId({ type: 'Article', id: articleId }),
        language: routerLang,
        includeTranslation,
      },
      data: {
        article: {
          ...data.article,
          commentCount,
        },
      },
    })
  } catch (e) {
    console.error(e)
  }
}
