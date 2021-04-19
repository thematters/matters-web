import { gql } from '@apollo/client'

import { SubscribeCircleDialog } from '~/components'

export const fragments = {
  circle: {
    public: gql`
      fragment SubscriptionBannerCirclePublic on Circle {
        id
        prices {
          amount
          currency
        }
        ...SubscribeCirclePublic
      }
      ${SubscribeCircleDialog.fragments.circle.public}
    `,
    private: gql`
      fragment SubscriptionBannerCirclePrivate on Circle {
        id
        owner {
          id
        }
        isMember
        ...SubscribeCirclePrivate
      }
      ${SubscribeCircleDialog.fragments.circle.private}
    `,
  },
}
