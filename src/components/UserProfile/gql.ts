import gql from 'graphql-tag'

import { Avatar, FollowButton } from '~/components'

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
        followees(input: { first: 0 }) {
          totalCount
        }
        followers(input: { first: 0 }) {
          totalCount
        }
        status {
          state
        }
        ...AvatarUser
        ...DropdownActionsUserPublic
      }
      ${Avatar.fragments.user}
      ${DropdownActions.fragments.user.public}
    `,
    private: gql`
      fragment ProfileUserPrivate on User {
        id
        ...FollowButtonUserPrivate
        ...DropdownActionsUserPrivate
      }
      ${FollowButton.fragments.user.private}
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
