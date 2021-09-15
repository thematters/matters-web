import gql from 'graphql-tag'

import { Avatar, SubscribeCircleDialog } from '~/components'
import Counts from '~/components/CircleDigest/Counts'

export const fragments = {
  circle: {
    public: gql`
      fragment CircleWidgetCirclePublic on Circle {
        id
        description
        latestMembers: members(input: { first: 3 }) {
          totalCount
          edges {
            cursor
            node {
              user {
                id
                ...AvatarUser
              }
            }
          }
        }
        ...CountsCircle
        ...SubscribeCirclePublic
      }
      ${Avatar.fragments.user}
      ${Counts.fragments.circle}
      ${SubscribeCircleDialog.fragments.circle.public}
    `,
    private: gql`
      fragment CircleWidgetCirclePrivate on Circle {
        id
        ...SubscribeCirclePrivate
      }
      ${SubscribeCircleDialog.fragments.circle.private}
    `,
  },
}
