import gql from 'graphql-tag'

import FollowingRecommendArticle from '../FollowingRecommendArticle'

export const fragments = gql`
  fragment RecommendArticleActivity on ArticleRecommendationActivity {
    source
    recommendArticles: nodes {
      ...FollowingFeedRecommendArticlePublic
      ...FollowingFeedRecommendArticlePrivate
    }
  }
  ${FollowingRecommendArticle.fragments.article.public}
  ${FollowingRecommendArticle.fragments.article.private}
`
