import gql from 'graphql-tag'

import { UserDigest } from '~/components/UserDigest'

export const fragments = {
  circle: gql`
    fragment AuthorWidgetCircle on Circle {
      id
      owner {
        id
        ...UserDigestRichUserPublic
      }
    }
    ${UserDigest.Rich.fragments.user.public}
  `,
}
