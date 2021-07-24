import gql from 'graphql-tag'

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
`
