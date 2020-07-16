import { gql } from '@apollo/client'

import { UserDigest } from '~/components/UserDigest'

export default gql`
  query SearchUsers($search: String!) {
    search(input: { key: $search, type: User, first: 5 }) {
      edges {
        node {
          ... on User {
            ...UserDigestMiniUser
          }
        }
      }
    }
  }
  ${UserDigest.Mini.fragments.user}
`
