import gql from 'graphql-tag'

import { CircleAvatar } from '~/components'

import FollowButton from './FollowButton'
// import DropdownActions from './DropdownActions'

const fragments = {
  circle: {
    public: gql`
      fragment ProfileCirclePublic on Circle {
        id
        name
        displayName
        description
        cover
        owner {
          id
        }
        members(input: { first: 0 }) {
          totalCount
        }
        followers(input: { first: 0 }) {
          totalCount
        }
        ...AvatarCircle
        ...FollowButtonCirclePrivate
      }
      ${CircleAvatar.fragments.circle}
      ${FollowButton.fragments.circle.private}
    `,
    private: gql`
      fragment ProfileCirclePrivate on Circle {
        id
        isMember
        ...FollowButtonCirclePrivate
      }
      ${FollowButton.fragments.circle.private}
    `,
  },
}

export const CIRCLE_PROFILE_PUBLIC = gql`
  query CircleProfilePublic($name: String!) {
    circle(input: { name: $name }) {
      ...ProfileCirclePublic
      ...ProfileCirclePrivate
    }
  }
  ${fragments.circle.public}
  ${fragments.circle.private}
`

export const CIRCLE_PROFILE_PRIVATE = gql`
  query CircleProfilePrivate($name: String!) {
    circle(input: { name: $name }) {
      ...ProfileCirclePrivate
    }
  }
  ${fragments.circle.private}
`
