import gql from 'graphql-tag'

import { UserDigest } from '~/components/UserDigest'

export const GET_PARTICIPANTS = gql`
  query GetParticipants($id: ID!, $after: String) {
    campaign(input: { id: $$ID }) {
      id
      participants(input: { first: 20, after: $after }) {
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
    }
  }
  ${UserDigest.Rich.fragments.user.public}
`
