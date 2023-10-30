import gql from 'graphql-tag'

import FollowingRecommendArticle from '../FollowingRecommendArticle'

export const fragments = gql`
  fragment RecommendArticleActivity on ArticleRecommendationActivity {
    source
    recommendArticles: nodes {
      ...FollowingFeedRecommendArticlePublic
    }
  }
  ${FollowingRecommendArticle.fragments.article.public}
`
