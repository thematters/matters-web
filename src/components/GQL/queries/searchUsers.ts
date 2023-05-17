import gql from 'graphql-tag'

import { UserDigest } from '~/components/UserDigest'

export default gql`
  query SearchUsers($search: String!, $exclude: SearchExclude) {
    search(
      input: {
        key: $search
        type: User
        first: 5
        exclude: $exclude
        quicksearch: true
      }
    ) {
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
