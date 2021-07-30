import gql from 'graphql-tag'

import { CircleDigest } from '~/components/CircleDigest'
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
        access {
          type
          circle {
            id
            name
            ...DigestPlainCircle
          }
        }
        ...ArticleDigestTitleArticle
        ...FooterActionsArticlePublic
      }
      ${UserDigest.Mini.fragments.user}
      ${ArticleDigestTitle.fragments.article}
      ${FooterActions.fragments.article.public}
      ${CircleDigest.Plain.fragments.circle}
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
