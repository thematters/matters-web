import gql from 'graphql-tag'

import CircleProfile from './Profile'

export const CIRCLE_DETAIL_PUBLIC = gql`
  query CircleDetailPublic($name: String!) {
    circle(input: { name: $name }) {
      ...ProfileCirclePublic
      ...ProfileCirclePrivate
    }
  }
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
