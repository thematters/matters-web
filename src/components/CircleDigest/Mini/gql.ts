import gql from 'graphql-tag'

import { CircleAvatar } from '~/components/CircleAvatar'

import Counts from '../Counts'

export const fragments = {
  circle: gql`
    fragment DigestMiniCircle on Circle {
      id
      name
      displayName
      description
      ...AvatarCircle
      ...CountsCircle
    }
    ${CircleAvatar.fragments.circle}
    ${Counts.fragments.circle}
  `,
}
