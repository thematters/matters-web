import gql from 'graphql-tag'

import { ArticleDigestTitle } from '~/components/ArticleDigest/Title'
import { UserDigest } from '~/components/UserDigest'

export const fragments = {
  article: {
    public: gql`
      fragment FollowingFeedRecommendArticlePublic on Article {
        id
        title
        slug
        mediaHash
        recommendArticleState: state
        cover
        summary
        author {
          id
          userName
          ...UserDigestMiniUser
        }
        ...ArticleDigestTitleArticle
      }
      ${UserDigest.Mini.fragments.user}
      ${ArticleDigestTitle.fragments.article}
    `,
  },
}
