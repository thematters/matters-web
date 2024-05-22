import { DataProxy } from 'apollo-cache'
import _remove from 'lodash/remove'

import { toGlobalId } from '~/common/utils'
import { Viewer } from '~/components/Context'
import {
  ArticleAvailableTranslationsQuery,
  ArticleDetailPublicQuery,
  UserLanguage,
} from '~/gql/graphql'

export const updateArticlePublic = ({
  cache,
  shortHash,
  routerLang,
  type,
  viewer,
  txId,
}: {
  cache: DataProxy
  shortHash: string
  routerLang: UserLanguage
  viewer?: Viewer
  txId?: string
  type:
    | 'deleteComment'
    | 'addComment'
    | 'addSecondaryComment'
    | 'deleteSecondaryComment'
    | 'updateDonation'
}) => {
  // FIXME: circular dependencies
  const {
    ARTICLE_DETAIL_PUBLIC,
    ARTICLE_AVAILABLE_TRANSLATIONS,
  } = require('~/views/ArticleDetail/gql.ts')

  try {
    const translationResult =
      cache.readQuery<ArticleAvailableTranslationsQuery>({
        query: ARTICLE_AVAILABLE_TRANSLATIONS,
        variables: { shortHash },
      })

    if (!translationResult) {
      return
    }

    const includeTranslation =
      !!routerLang &&
      (translationResult?.article?.availableTranslations || []).includes(
        routerLang
      )

    const detailQueryVariables = {
      shortHash,
      language: routerLang || UserLanguage.ZhHant,
      includeTranslation,
    }
    const data = cache.readQuery<ArticleDetailPublicQuery>({
      query: ARTICLE_DETAIL_PUBLIC,
      variables: detailQueryVariables,
    })

    if (data?.article?.__typename !== 'Article') {
      return
    }
    let commentCount = data.article.commentCount
    let totalCount = data.article.comments.totalCount
    switch (type) {
      case 'addComment':
        totalCount += 1
        commentCount += 1
        break
      case 'deleteComment':
        totalCount -= 1
        commentCount -= 1
        break
      case 'addSecondaryComment':
        commentCount += 1
        break
      case 'deleteSecondaryComment':
        commentCount -= 1
        break
      case 'updateDonation':
        if (!txId) {
          return
        }
        // unshift viewer into donations
        const donations = data.article?.donations?.edges || []
        let existed = false
        _remove(donations, (d) => {
          if (!viewer?.id || d.node.sender?.id !== viewer.id) {
            return false
          }
          existed = true
          return true
        })
        const donatorsCount = data.article?.donations?.totalCount || 0

        data.article.donations.totalCount = existed
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
        data.article.donations.edges = donations
        break
    }

    cache.writeQuery({
      query: ARTICLE_DETAIL_PUBLIC,
      variables: detailQueryVariables,
      data: {
        article: {
          ...data.article,
          commentCount: commentCount,
          comments: {
            ...data.article.comments,
            totalCount: totalCount,
          },
        },
      },
    })
  } catch (e) {
    console.error(e)
  }
}
