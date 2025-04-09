import gql from 'graphql-tag'

import { UserDigest } from '~/components/UserDigest'

import { ArticleDigestTitle } from '../Title'
import FooterActions from './FooterActions'

export const fragments = {
  article: {
    public: gql`
      fragment ArticleDigestFeedArticlePublic on Article {
        id
        title
        slug
        shortHash
        articleState: state
        cover
        assets {
          id
          type
          path
        }
        summary
        author {
          id
          userName
          ...UserDigestMiniUser
        }
        ...ArticleDigestTitleArticle
        ...FooterActionsArticlePublic
      }
      ${UserDigest.Mini.fragments.user}
      ${ArticleDigestTitle.fragments.article}
      ${FooterActions.fragments.article.public}
    `,
    private: gql`
      fragment ArticleDigestFeedArticlePrivate on Article {
        id
        ...FooterActionsArticlePrivate
      }
      ${FooterActions.fragments.article.private}
    `,
  },
}
