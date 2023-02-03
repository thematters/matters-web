import gql from 'graphql-tag'

import { CircleDigest } from '~/components'

export const fragments = {
  circle: {
    public: gql`
      fragment CircleWallCirclePublic on Circle {
        id
        ...DigestRichCirclePublic
      }
      ${CircleDigest.Rich.fragments.circle.public}
    `,
    private: gql`
      fragment CircleWallCirclePrivate on Circle {
        id
        ...DigestRichCirclePrivate
      }
      ${CircleDigest.Rich.fragments.circle.private}
    `,
  },
}
