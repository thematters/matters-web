import { ApolloCache } from '@apollo/client/cache'

import { COMMENTS_COUNT } from '~/common/enums'
import { toGlobalId } from '~/common/utils'
import { Viewer } from '~/components/Context'
import {
  ArticleAvailableTranslationsQuery,
  ArticleDetailPublicQuery,
  LatestCommentsPublicQuery,
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
  cache: ApolloCache<object>
  shortHash: string
  routerLang: UserLanguage
  viewer?: Viewer
  txId?: string
  type: 'deleteComment' | 'deleteSecondaryComment' | 'updateDonation'
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

    // Create immutable copies of the data
    let updatedCommentCount = data.article.commentCount
    let updatedTotalCount = data.article.comments.totalCount
    let updatedDonations = data.article?.donations
      ? { ...data.article.donations }
      : undefined

    switch (type) {
      case 'deleteComment':
        updatedTotalCount -= 1
        updatedCommentCount -= 1
        break
      case 'deleteSecondaryComment':
        updatedCommentCount -= 1
        break
      case 'updateDonation':
        if (!txId || !updatedDonations || !viewer?.id) {
          return
        }

        // Create a new immutable array of donations
        const currentDonations = [...(updatedDonations.edges || [])]

        // Check if the viewer already has a donation
        let existed = false
        const filteredDonations = currentDonations.filter((d) => {
          if (!viewer?.id || d.node.sender?.id !== viewer.id) {
            return true
          }
          existed = true
          return false
        })

        // Update the total count
        const updatedDonatorsCount = existed
          ? updatedDonations.totalCount
          : (updatedDonations.totalCount || 0) + 1

        // Create a new donation edge
        const newDonationEdge = {
          cursor:
            window.btoa(`arrayconnection:${filteredDonations.length}`) || '',
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
                    __typename: 'Liker' as const,
                  },
                  info: {
                    badges: viewer.info.badges,
                    __typename: 'UserInfo' as const,
                  },
                  __typename: 'User' as const,
                }
              : null,
            __typename: 'ArticleDonation' as const,
          },
          __typename: 'ArticleDonationEdge' as const,
        }

        // Create a new immutable array with the new donation at the beginning
        const updatedDonationEdges = [newDonationEdge, ...filteredDonations]

        // Update the donations object
        updatedDonations = {
          ...updatedDonations,
          totalCount: updatedDonatorsCount,
          edges: updatedDonationEdges,
        }

        // Also update fromDonator flag for this user's comments
        const {
          LATEST_COMMENTS_PUBLIC,
        } = require('~/views/ArticleDetail/Comments/LatestComments/gql.ts')

        const latestCommentsResult = cache.readQuery<LatestCommentsPublicQuery>(
          {
            query: LATEST_COMMENTS_PUBLIC,
            variables: { id: data.article.id, first: COMMENTS_COUNT },
          }
        )

        const article = latestCommentsResult?.article

        if (article?.__typename === 'Article' && article.comments?.edges) {
          article.comments.edges.forEach((edge) => {
            if (edge.node.author?.id === viewer.id) {
              cache.modify({
                id: cache.identify(edge.node),
                fields: {
                  fromDonator: () => true,
                },
              })
            }
          })
        }

        // Also update pinnedComments if they exist
        if (article?.__typename === 'Article' && article.pinnedComments) {
          article.pinnedComments.forEach((comment) => {
            if (comment.author?.id === viewer.id) {
              cache.modify({
                id: cache.identify(comment),
                fields: {
                  fromDonator: () => true,
                },
              })
            }
          })
        }

        break
    }

    cache.writeQuery({
      query: ARTICLE_DETAIL_PUBLIC,
      variables: detailQueryVariables,
      data: {
        ...data,
        article: {
          ...data.article,
          commentCount: updatedCommentCount,
          comments: {
            ...data.article.comments,
            totalCount: updatedTotalCount,
          },
          ...(updatedDonations && { donations: updatedDonations }),
        },
      },
    })
  } catch (e) {
    console.error(e)
  }
}
