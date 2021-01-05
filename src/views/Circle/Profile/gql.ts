import gql from 'graphql-tag'

import { CircleAvatar } from '~/components'

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
        members(input: { first: 0 }) {
          totalCount
        }
        followers(input: { first: 0 }) {
          totalCount
        }
        ...AvatarCircle
      }
      ${CircleAvatar.fragments.circle}
    `,
    private: gql`
      fragment ProfileCirclePrivate on Circle {
        id
        isMember
      }
    `,
  },
}

export const CIRCLE_PROFILE_PUBLIC = gql`
  query CircleProfilePublic($name: String!) {
    circle(input: { name: $name }) {
      ...ProfileCirclePublic
    }
  }
  ${fragments.circle.public}
`

export const CIRCLE_PROFILE_PRIVATE = gql`
  query CircleProfilePrivate($name: String!) {
    circle(input: { name: $name }) {
      ...ProfileCirclePrivate
    }
  }
  ${fragments.circle.private}
`
