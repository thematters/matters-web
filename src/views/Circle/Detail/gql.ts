import gql from 'graphql-tag'

import DropdownActions from './DropdownActions'
import CircleProfile from './Profile'

export const CIRCLE_DETAIL_PUBLIC = gql`
  query CircleDetailPublic($name: String!) {
    circle(input: { name: $name }) {
      ...DropdownActionsCircle
      ...ProfileCirclePublic
      ...ProfileCirclePrivate
    }
  }
  ${DropdownActions.fragments.circle}
  ${CircleProfile.fragments.circle.public}
  ${CircleProfile.fragments.circle.private}
`

export const CIRCLE_DETAIL_PRIVATE = gql`
  query CircleDetailPrivate($name: String!) {
    circle(input: { name: $name }) {
      ...ProfileCirclePrivate
    }
  }
  ${CircleProfile.fragments.circle.private}
`
