import gql from 'graphql-tag'

import { UserDigest } from '~/components/UserDigest'

export default gql`
  query TagMaintainers($id: ID!) {
    node(input: { id: $id }) {
      ... on Tag {
        id
        owner {
          id
          ...UserDigestRichUserPublic
        }
        editors(input: { excludeAdmin: true, excludeOwner: true }) {
          id
          ...UserDigestRichUserPublic
        }
        __typename
      }
    }
  }
  ${UserDigest.Rich.fragments.user.public}
`
