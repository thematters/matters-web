import gql from 'graphql-tag'

import RecommendArticleActivity from './RecommendArticleActivity'
import RecommendUserActivity from './RecommendUserActivity'
import UserAddArticleTagActivity from './UserAddArticleTagActivity'
import UserBroadcastCircleActivity from './UserBroadcastCircleActivity'
import UserCreateCircleActivity from './UserCreateCircleActivity'
import UserPostMomentActivity from './UserPostMomentActivity'
import UserPublishArticleActivity from './UserPublishArticleActivity'

export const FOLLOWING_FEED = gql`
  query FollowingFeed(
    $after: String
    $type: RecommendationFollowingFilterType
  ) {
    viewer {
      id
      recommendation {
        following(
          input: { first: 10, after: $after, filter: { type: $type } }
        ) {
          pageInfo {
            startCursor
            endCursor
            hasNextPage
          }
          edges {
            cursor
            node {
              __typename
              ... on UserPublishArticleActivity {
                ...UserPublishArticleActivity
              }
              ... on UserPostMomentActivity {
                ...UserPostMomentActivity
              }
              ... on UserBroadcastCircleActivity {
                ...UserBroadcastCircleActivity
              }
              ... on UserCreateCircleActivity {
                ...UserCreateCircleActivity
              }
              ... on UserAddArticleTagActivity {
                ...UserAddArticleTagActivity
              }
              ... on ArticleRecommendationActivity {
                ...RecommendArticleActivity
              }
              ... on UserRecommendationActivity {
                ...RecommendUserActivity
              }
            }
          }
        }
      }
    }
  }
  ${UserAddArticleTagActivity.fragments}
  ${UserBroadcastCircleActivity.fragments}
  ${UserCreateCircleActivity.fragments}
  ${UserPostMomentActivity.fragments}
  ${UserPublishArticleActivity.fragments}
  ${RecommendArticleActivity.fragments}
  ${RecommendUserActivity.fragments}
`
