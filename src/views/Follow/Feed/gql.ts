import gql from 'graphql-tag'

import { ArticleDigestFeed, CircleDigest, Tag, UserDigest } from '~/components'

import UnfollowTag from './DropdownActions/UnfollowTag'
import UnfollowUser from './DropdownActions/UnfollowUser'
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
                  ...UnfollowActionButtonUserPrivate
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
                  ...UnfollowActionButtonUserPrivate
                }
                createdAt
                nodeCircle: node {
                  ...FollowingFeedCircle
                }
              }
              ... on UserCollectArticleActivity {
                actor {
                  ...UserDigestPlainUser
                  ...UnfollowActionButtonUserPrivate
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
                  ...UnfollowActionButtonUserPrivate
                }
                createdAt
                nodeCircle: node {
                  ...FollowingFeedCircle
                }
              }
              ... on UserFollowUserActivity {
                actor {
                  ...UserDigestPlainUser
                  ...UnfollowActionButtonUserPrivate
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
                  ...UnfollowActionButtonUserPrivate
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
                  ...UnfollowActionButtonUserPrivate
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
                  ...UnfollowActionButtonTagPrivate
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
  ${UnfollowUser.fragments.user.private}
  ${UnfollowTag.fragments.tag.private}
  ${ArticleDigestFeed.fragments.article.public}
  ${ArticleDigestFeed.fragments.article.private}
  ${FollowingFeedComment.fragments.comment.public}
  ${FollowingFeedComment.fragments.comment.private}
  ${FollowingFeedCircle.fragments.circle}
  ${FollowingFeedUser.fragments.user.public}
  ${FollowingFeedUser.fragments.user.private}
`
