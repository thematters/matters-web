import gql from 'graphql-tag'

import { UserDigest } from '~/components'

export const RECOMMENDED_AUTHORS = gql`
  query TagDetailRecommendedAuthors($id: ID!) {
    node(input: { id: $id }) {
      ... on Tag {
        id
        recommendedAuthors(input: { first: 5 }) {
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
