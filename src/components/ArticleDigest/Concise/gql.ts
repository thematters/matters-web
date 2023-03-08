import gql from 'graphql-tag'

import { UserDigest } from '~/components/UserDigest'

import { ArticleDigestTitle } from '../Title'
import FooterActions from './FooterActions'

export const fragments = {
  article: {
    public: gql`
      fragment ArticleDigestConciseArticlePublic on Article {
        id
        title
        slug
        mediaHash
        articleState: state
        cover
        summary
        author {
          id
          userName
          ...UserDigestMiniUser
        }
        ...ArticleDigestTitleArticle
        ...FooterActionsConciseArticlePublic
      }
      ${UserDigest.Mini.fragments.user}
      ${ArticleDigestTitle.fragments.article}
      ${FooterActions.fragments.article.public}
    `,
    private: gql`
      fragment ArticleDigestConciseArticlePrivate on Article {
        id
        author {
          ...ArticleFeedFollowButtonUserPrivate
        }
        ...FooterActionsConciseArticlePrivate
      }
      ${FooterActions.fragments.article.private}
    `,
  },
}
