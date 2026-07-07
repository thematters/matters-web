import gql from 'graphql-tag'

import { MomentDigestFeed } from '~/components/MomentDigest/Feed'

export const TAG_MOMENTS_PUBLIC = gql`
  query TagMomentsPublic($id: ID!, $after: String) {
    node(input: { id: $id }) {
      ... on Tag {
        id
        moments(input: { first: 10, after: $after }) {
          pageInfo {
            startCursor
            endCursor
            hasNextPage
          }
          edges {
            cursor
            node {
              ...MomentDigestFeedMomentPublic
              ...MomentDigestFeedMomentPrivate
            }
          }
        }
      }
    }
  }
  ${MomentDigestFeed.fragments.moment.public}
  ${MomentDigestFeed.fragments.moment.private}
`

export const TAG_MOMENTS_PRIVATE = gql`
  query TagMomentsPrivate($ids: [ID!]!) {
    nodes(input: { ids: $ids }) {
      id
      ... on Moment {
        ...MomentDigestFeedMomentPrivate
      }
    }
  }
  ${MomentDigestFeed.fragments.moment.private}
`
