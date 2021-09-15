import gql from 'graphql-tag'

import { Avatar, FollowUserButton } from '~/components'

import CircleWidget from './CircleWidget'
import DropdownActions from './DropdownActions'

const fragments = {
  user: {
    public: gql`
      fragment ProfileUserPublic on User {
        id
        userName
        displayName
        liker {
          civicLiker
        }
        info {
          badges {
            type
          }
          description
          profileCover
        }
        status {
          state
        }
        ownCircles {
          id
          broadcast(input: { first: 1 }) {
            edges {
              node {
                content
              }
            }
          }
          ...CircleWidgetCirclePublic
        }
        ...AvatarUser
        ...DropdownActionsUserPublic
      }
      ${Avatar.fragments.user}
      ${CircleWidget.fragments.circle.public}
      ${DropdownActions.fragments.user.public}
    `,
    private: gql`
      fragment ProfileUserPrivate on User {
        id
        ownCircles {
          ...CircleWidgetCirclePrivate
        }
        ...FollowButtonUserPrivate
        ...DropdownActionsUserPrivate
      }
      ${CircleWidget.fragments.circle.private}
      ${FollowUserButton.fragments.user.private}
      ${DropdownActions.fragments.user.private}
    `,
  },
}

export const USER_PROFILE_PUBLIC = gql`
  query UserProfileUserPublic($userName: String!) {
    user(input: { userName: $userName }) {
      ...ProfileUserPublic
      ...ProfileUserPrivate
    }
  }
  ${fragments.user.public}
  ${fragments.user.private}
`

export const USER_PROFILE_PRIVATE = gql`
  query UserProfileUserPrivate($userName: String!) {
    user(input: { userName: $userName }) {
      ...ProfileUserPrivate
    }
  }
  ${fragments.user.private}
`
