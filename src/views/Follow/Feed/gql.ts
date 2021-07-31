import gql from 'graphql-tag'

import RecommendArticleActivity from './RecommendArticleActivity'
import UserAddArticleTagActivity from './UserAddArticleTagActivity'
import UserBookmarkArticleActivity from './UserBookmarkArticleActivity'
import UserBroadcastCircleActivity from './UserBroadcastCircleActivity'
import UserCollectArticleActivity from './UserCollectArticleActivity'
import UserCreateCircleActivity from './UserCreateCircleActivity'
import UserDonateArticleActivity from './UserDonateArticleActivity'
import UserFollowUserActivity from './UserFollowUserActivity'
import UserPublishArticleActivity from './UserPublishArticleActivity'
import UserSubscribeCircleActivity from './UserSubscribeCircleActivity'

export const FOLLOWING_FEED = gql`
  query FollowingFeed($followingAfter: String, $recommendAfter: String) {
    viewer {
      id
      recommendation {
        following(input: { first: 6, after: $followingAfter }) {
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
              ... on UserCollectArticleActivity {
                ...UserCollectArticleActivity
              }
              ... on UserSubscribeCircleActivity {
                ...UserSubscribeCircleActivity
              }
              ... on UserFollowUserActivity {
                ...UserFollowUserActivity
              }
              ... on UserDonateArticleActivity {
                ...UserDonateArticleActivity
              }
              ... on UserBookmarkArticleActivity {
                ...UserBookmarkArticleActivity
              }
              ... on UserAddArticleTagActivity {
                ...UserAddArticleTagActivity
              }
            }
          }
        }
        # every 3 following activities append with 1 recommending article
        readTagsArticles(input: { first: 2, after: $recommendAfter }) {
          pageInfo {
            startCursor
            endCursor
            hasNextPage
          }
          edges {
            cursor
            node {
              __typename
              ...RecommendArticleActivity
            }
          }
        }
      }
    }
  }
  ${UserAddArticleTagActivity.fragments}
  ${UserBookmarkArticleActivity.fragments}
  ${UserBroadcastCircleActivity.fragments}
  ${UserCollectArticleActivity.fragments}
  ${UserCreateCircleActivity.fragments}
  ${UserDonateArticleActivity.fragments}
  ${UserFollowUserActivity.fragments}
  ${UserPublishArticleActivity.fragments}
  ${UserSubscribeCircleActivity.fragments}
  ${RecommendArticleActivity.fragments}
`
