import gql from 'graphql-tag'

import { UserDigest } from '~/components/UserDigest'

export default gql`
  query TagEditors($id: ID!) {
    node(input: { id: $id }) {
      ... on Tag {
        id
        owner {
          id
          ...UserDigestRichUserPublic
        }
        editors(input: { excludeAdmin: true }) {
          id
          ...UserDigestRichUserPublic
        }
        __typename
      }
    }
  }
  ${UserDigest.Rich.fragments.user.public}
`
