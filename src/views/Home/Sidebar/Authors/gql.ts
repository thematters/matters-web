import gql from 'graphql-tag'

import { UserDigest } from '~/components'

export const SIDEBAR_AUTHORS = gql`
  query SidebarAuthors($random: random_Int_min_0_max_49) {
    viewer @connection(key: "viewerSidebarAuthors") {
      id
      recommendation {
        authors(
          input: { first: 5, filter: { random: $random, followed: false } }
        ) {
          edges {
            cursor
            node {
              ...UserDigestRichUserPublic
              ...UserDigestRichUserPrivate
            }
          }
        }
      }
    }
  }
  ${UserDigest.Rich.fragments.user.public}
  ${UserDigest.Rich.fragments.user.private}
`
