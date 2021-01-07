import gql from 'graphql-tag'

import { CircleAvatar } from '~/components'

import FollowButton from './FollowButton'

export const fragments = {
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
