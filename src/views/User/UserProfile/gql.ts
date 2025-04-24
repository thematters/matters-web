import gql from 'graphql-tag'

import { Avatar } from '~/components/Avatar'
import { FollowUserButton } from '~/components/Buttons/FollowUser'
import { CircleDigest } from '~/components/CircleDigest'

import UserTabs from '../UserTabs'
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
          ethAddress
        }
        articles(input: { first: 0 }) {
          totalCount
        }
        following {
          users(input: { first: 0 }) {
            totalCount
          }
        }
        followers(input: { first: 0 }) {
          totalCount
        }
        status {
          state
        }
        ownCircles {
          ...DigestRichCirclePublic
        }
        ...AvatarUser
        ...AvatarUserLogbook
        ...DropdownActionsUserPublic
        ...TabsUser
      }
      ${Avatar.fragments.user}
      ${Avatar.fragments.logbook}
      ${CircleDigest.Rich.fragments.circle.public}
      ${DropdownActions.fragments.user.public}
      ${UserTabs.fragments.user}
    `,
    private: gql`
      fragment ProfileUserPrivate on User {
        id
        ownCircles {
          ...DigestRichCirclePrivate
        }
        ...FollowButtonUserPrivate
        ...DropdownActionsUserPrivate
      }
      ${CircleDigest.Rich.fragments.circle.private}
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
