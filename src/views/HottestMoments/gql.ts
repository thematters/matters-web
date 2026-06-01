import gql from 'graphql-tag'

import { MomentDigestFeed } from '~/components/MomentDigest/Feed'

const momentConnectionFragment = gql`
  fragment HottestMomentConnection on MomentConnection {
    pageInfo {
      startCursor
      endCursor
      hasNextPage
    }
    edges {
      cursor
      node {
        ...MomentDigestFeedMomentPublic
      }
    }
  }
  ${MomentDigestFeed.fragments.moment.public}
`

export const HOTTEST_MOMENTS_PUBLIC = gql`
  query HottestMomentsPublic($after: String) {
    viewer {
      id
      recommendation {
        hottestMoments(input: { first: 20, after: $after }) {
          ...HottestMomentConnection
        }
      }
    }
  }
  ${momentConnectionFragment}
`

export const HOTTEST_MOMENTS_PRIVATE = gql`
  query HottestMomentsPrivate($ids: [ID!]!) {
    nodes(input: { ids: $ids }) {
      id
      ... on Moment {
        ...MomentDigestFeedMomentPrivate
      }
    }
  }
  ${MomentDigestFeed.fragments.moment.private}
`
