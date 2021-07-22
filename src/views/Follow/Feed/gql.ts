import gql from 'graphql-tag'

import { ArticleDigestFeed, CircleDigest, Tag, UserDigest } from '~/components'

import FollowingFeedCircle from './FollowingFeedCircle'
import FollowingFeedComment from './FollowingFeedComment'
import FollowingFeedUser from './FollowingFeedUser'

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
                  ...FollowingFeedCommentPublic
                  ...FollowingFeedCommentPrivate
                }
                targetCircle: target {
                  ...FollowingFeedCircle
                }
              }
              ... on UserCreateCircleActivity {
                actor {
                  ...UserDigestPlainUser
                }
                createdAt
                nodeCircle: node {
                  ...FollowingFeedCircle
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
                  ...FollowingFeedCircle
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
  ${FollowingFeedComment.fragments.comment.public}
  ${FollowingFeedComment.fragments.comment.private}
  ${FollowingFeedCircle.fragments.circle}
  ${FollowingFeedUser.fragments.user.public}
  ${FollowingFeedUser.fragments.user.private}
`
