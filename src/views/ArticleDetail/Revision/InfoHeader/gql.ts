import gql from 'graphql-tag'

import { UserDigest } from '~/components'

export const fragments = {
  article: gql`
    fragment InfoHeader on Article {
      id
      author {
        id
        ...UserDigestMiniUser
      }
      mediaHash
      dataHash
      iscnId
      createdAt
      access {
        type
      }
    }
    ${UserDigest.Mini.fragments.user}
  `,
}
