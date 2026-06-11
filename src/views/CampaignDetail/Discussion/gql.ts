import gql from 'graphql-tag'

import { CircleThreadComment } from '~/components'

// public: anyone can read the campaign discussion
export const CAMPAIGN_DISCUSSION_COMMENTS = gql`
  query CampaignDiscussionComments(
    $shortHash: String!
    $before: String
    $after: String
    $first: first_Int_min_0 = 15
    $includeAfter: Boolean
    $includeBefore: Boolean
  ) {
    campaign(input: { shortHash: $shortHash }) {
      id
      ... on WritingChallenge {
        id
        discussionCount
        discussion(
          input: {
            after: $after
            before: $before
            first: $first
            includeAfter: $includeAfter
            includeBefore: $includeBefore
          }
        ) {
          totalCount
          pageInfo {
            startCursor
            endCursor
            hasNextPage
          }
          edges {
            node {
              ...CircleCommentThreadCommentCommentPublic
              ...CircleCommentThreadCommentCommentPrivate
            }
          }
        }
      }
    }
  }
  ${CircleThreadComment.fragments.comment.public}
  ${CircleThreadComment.fragments.comment.private}
`

// private: whether the viewer (a logged-in user) is a succeeded participant,
// which decides if they may post
export const CAMPAIGN_DISCUSSION_VIEWER = gql`
  query CampaignDiscussionViewer($shortHash: String!) {
    campaign(input: { shortHash: $shortHash }) {
      id
      ... on WritingChallenge {
        id
        application {
          state
        }
      }
    }
  }
`
