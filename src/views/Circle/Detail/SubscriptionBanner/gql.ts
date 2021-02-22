import gql from 'graphql-tag'

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
        ...SubscribeCircle
      }
      ${SubscribeCircleDialog.fragments.circle}
    `,
    private: gql`
      fragment SubscriptionBannerCirclePrivate on Circle {
        id
        owner {
          id
        }
        isMember
      }
    `,
  },
}
