import gql from 'graphql-tag'

import { UserDigest } from '~/components/UserDigest'

export const GET_PARTICIPANTS = gql`
  query GetParticipants($shortHash: String!, $after: String) {
    campaign(input: { shortHash: $shortHash }) {
      id
      ... on WritingChallenge {
        application {
          state
        }
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
  }
  ${UserDigest.Rich.fragments.user.public}
`
