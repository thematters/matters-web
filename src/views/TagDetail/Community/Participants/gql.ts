import gql from 'graphql-tag'

import { UserDigest } from '~/components/UserDigest'

export default gql`
  query TagParticipants($id: ID!, $after: String) {
    node(input: { id: $id }) {
      ... on Tag {
        id
        participants(input: { first: 10, after: $after }) {
          totalCount
          pageInfo {
            startCursor
            endCursor
            hasNextPage
          }
          edges {
            cursor
            node {
              ...UserDigestRichUserPublic
            }
          }
        }
        __typename
      }
    }
  }
  ${UserDigest.Rich.fragments.user.public}
`
