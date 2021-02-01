import gql from 'graphql-tag'

import DropdownActions from './DropdownActions'
import CircleProfile from './Profile'
import SubscriptionBanner from './SubscriptionBanner'

export const CIRCLE_DETAIL_PUBLIC = gql`
  query CircleDetailPublic($name: String!) {
    circle(input: { name: $name }) {
      ...DropdownActionsCirclePublic
      ...DropdownActionsCirclePrivate
      ...ProfileCirclePublic
      ...ProfileCirclePrivate
      ...SubscriptionBannerCirclePublic
      ...SubscriptionBannerCirclePrivate
    }
  }
  ${DropdownActions.fragments.circle.public}
  ${DropdownActions.fragments.circle.private}
  ${CircleProfile.fragments.circle.public}
  ${CircleProfile.fragments.circle.private}
  ${SubscriptionBanner.fragments.circle.public}
  ${SubscriptionBanner.fragments.circle.private}
`

export const CIRCLE_DETAIL_PRIVATE = gql`
  query CircleDetailPrivate($name: String!) {
    circle(input: { name: $name }) {
      ...DropdownActionsCirclePrivate
      ...ProfileCirclePrivate
      ...SubscriptionBannerCirclePrivate
    }
  }
  ${DropdownActions.fragments.circle.private}
  ${CircleProfile.fragments.circle.private}
  ${SubscriptionBanner.fragments.circle.private}
`
