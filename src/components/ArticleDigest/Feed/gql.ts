import gql from 'graphql-tag'

import { UserDigest } from '~/components/UserDigest'

import { ArticleDigestTitle } from '../Title'
import FollowButton from './FollowButton'
import FooterActions from './FooterActions'

export const fragments = {
  article: {
    public: gql`
      fragment ArticleDigestFeedArticlePublic on Article {
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
        ...FooterActionsArticlePublic
      }
      ${UserDigest.Mini.fragments.user}
      ${ArticleDigestTitle.fragments.article}
      ${FooterActions.fragments.article.public}
    `,
    private: gql`
      fragment ArticleDigestFeedArticlePrivate on Article {
        id
        author {
          ...ArticleFeedFollowButtonUserPrivate
        }
        ...FooterActionsArticlePrivate
      }
      ${FooterActions.fragments.article.private}
      ${FollowButton.fragments.user.private}
    `,
  },
}
