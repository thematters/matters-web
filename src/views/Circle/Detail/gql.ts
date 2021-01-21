import gql from 'graphql-tag'

import DropdownActions from './DropdownActions'
import CircleProfile from './Profile'
import SubscriptionBanner from './SubscriptionBanner'

export const CIRCLE_DETAIL_PUBLIC = gql`
  query CircleDetailPublic($name: String!) {
    circle(input: { name: $name }) {
      ...DropdownActionsCircle
      ...ProfileCirclePublic
      ...ProfileCirclePrivate
      ...SubscriptionBannerCirclePublic
      ...SubscriptionBannerCirclePrivate
    }
  }
  ${DropdownActions.fragments.circle}
  ${CircleProfile.fragments.circle.public}
  ${CircleProfile.fragments.circle.private}
  ${SubscriptionBanner.fragments.circle.public}
  ${SubscriptionBanner.fragments.circle.private}
`

export const CIRCLE_DETAIL_PRIVATE = gql`
  query CircleDetailPrivate($name: String!) {
    circle(input: { name: $name }) {
      ...ProfileCirclePrivate
      ...SubscriptionBannerCirclePrivate
    }
  }
  ${CircleProfile.fragments.circle.private}
  ${SubscriptionBanner.fragments.circle.private}
`
