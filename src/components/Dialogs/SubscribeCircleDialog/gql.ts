import gql from 'graphql-tag'

import { CircleDigest } from '~/components/CircleDigest'

export const fragments = {
  circle: {
    public: gql`
      fragment SubscribeCirclePublic on Circle {
        id
        ...DigestRichCirclePublic
      }
      ${CircleDigest.Rich.fragments.circle.public}
    `,
    private: gql`
      fragment SubscribeCirclePrivate on Circle {
        id
        ...DigestRichCirclePrivate
      }
      ${CircleDigest.Rich.fragments.circle.private}
    `,
  },
}
