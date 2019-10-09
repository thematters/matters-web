import gql from 'graphql-tag'

import { UserDigest } from '~/components/UserDigest'

export default gql`
  query SearchUsers($search: String!) {
    search(input: { key: $search, type: User, first: 5 }) {
      edges {
        node {
          ... on User {
            ...UserDigestBriefDescUser
          }
        }
      }
    }
  }
  ${UserDigest.BriefDesc.fragments.user}
`
