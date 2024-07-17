import gql from 'graphql-tag'

import RecommendArticleActivity from './RecommendArticleActivity'
import RecommendUserActivity from './RecommendUserActivity'
import UserAddArticleTagActivity from './UserAddArticleTagActivity'
import UserBroadcastCircleActivity from './UserBroadcastCircleActivity'
import UserCreateCircleActivity from './UserCreateCircleActivity'
import UserPublishArticleActivity from './UserPublishArticleActivity'

export const FOLLOWING_FEED = gql`
  query FollowingFeed($after: String) {
    viewer {
      id
      recommendation {
        following(input: { first: 10, after: $after }) {
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
  ${UserPublishArticleActivity.fragments}
  ${RecommendArticleActivity.fragments}
  ${RecommendUserActivity.fragments}
`
