import gql from 'graphql-tag'

import { ArticleDigestFeed, CircleDigest, Tag, UserDigest } from '~/components'

import FollowFeedCircle from './FollowFeedCircle'
import FollowFeedComment from './FollowFeedComment'
import FollowFeedUser from './FollowFeedUser'

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
                actor {
                  ...UserDigestPlainUser
                }
                createdAt
                nodeArticle: node {
                  access {
                    circle {
                      ...DigestPlainCircle
                    }
                  }
                  ...ArticleDigestFeedArticlePublic
                  ...ArticleDigestFeedArticlePrivate
                }
              }
              ... on UserBroadcastCircleActivity {
                actor {
                  ...UserDigestPlainUser
                }
                createdAt
                nodeComment: node {
                  ...FollowFeedCommentPublic
                  ...FollowFeedCommentPrivate
                }
                targetCircle: target {
                  ...FollowFeedCircle
                }
              }
              ... on UserCreateCircleActivity {
                actor {
                  ...UserDigestPlainUser
                }
                createdAt
                nodeCircle: node {
                  ...FollowFeedCircle
                }
              }
              ... on UserCollectArticleActivity {
                actor {
                  ...UserDigestPlainUser
                }
                createdAt
                nodeArticle: node {
                  ...ArticleDigestFeedArticlePublic
                  ...ArticleDigestFeedArticlePrivate
                }
                targetArticle: target {
                  ...ArticleDigestFeedArticlePublic
                  ...ArticleDigestFeedArticlePrivate
                }
              }
              ... on UserSubscribeCircleActivity {
                actor {
                  ...UserDigestPlainUser
                }
                createdAt
                nodeCircle: node {
                  ...FollowFeedCircle
                }
              }
              ... on UserFollowUserActivity {
                actor {
                  ...UserDigestPlainUser
                }
                createdAt
                nodeUser: node {
                  ...UserDigestRichUserPublic
                  ...UserDigestRichUserPrivate
                }
              }
              ... on UserDonateArticleActivity {
                actor {
                  ...UserDigestPlainUser
                }
                createdAt
                nodeArticle: node {
                  ...ArticleDigestFeedArticlePublic
                  ...ArticleDigestFeedArticlePrivate
                }
              }
              ... on UserBookmarkArticleActivity {
                actor {
                  ...UserDigestPlainUser
                }
                createdAt
                nodeArticle: node {
                  ...ArticleDigestFeedArticlePublic
                  ...ArticleDigestFeedArticlePrivate
                }
              }
              ... on UserAddArticleTagActivity {
                actor {
                  ...UserDigestPlainUser
                }
                createdAt
                nodeArticle: node {
                  ...ArticleDigestFeedArticlePublic
                  ...ArticleDigestFeedArticlePrivate
                }
                targetTag: target {
                  ...DigestTag
                }
              }
            }
          }
        }
      }
    }
  }
  ${UserDigest.Plain.fragments.user}
  ${CircleDigest.Plain.fragments.circle}
  ${Tag.fragments.tag}
  ${ArticleDigestFeed.fragments.article.public}
  ${ArticleDigestFeed.fragments.article.private}
  ${FollowFeedComment.fragments.comment.public}
  ${FollowFeedComment.fragments.comment.private}
  ${FollowFeedCircle.fragments.circle}
  ${FollowFeedUser.fragments.user.public}
  ${FollowFeedUser.fragments.user.private}
`
