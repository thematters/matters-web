import gql from 'graphql-tag'

import DropdownActions from './DropdownActions'
import CircleProfile from './Profile'

export const CIRCLE_DETAIL_PUBLIC = gql`
  query CircleDetailPublic($name: String!) {
    circle(input: { name: $name }) {
      ...DropdownActionsCirclePublic
      ...DropdownActionsCirclePrivate
      ...ProfileCirclePublic
      ...ProfileCirclePrivate
    }
  }
  ${DropdownActions.fragments.circle.public}
  ${DropdownActions.fragments.circle.private}
  ${CircleProfile.fragments.circle.public}
  ${CircleProfile.fragments.circle.private}
`

export const CIRCLE_DETAIL_PRIVATE = gql`
  query CircleDetailPrivate($name: String!) {
    circle(input: { name: $name }) {
      ...DropdownActionsCirclePrivate
      ...ProfileCirclePrivate
    }
  }
  ${DropdownActions.fragments.circle.private}
  ${CircleProfile.fragments.circle.private}
`
