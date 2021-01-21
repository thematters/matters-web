import gql from 'graphql-tag'

export const fragments = {
  circle: {
    public: gql`
      fragment SubscriptionBannerCirclePublic on Circle {
        id
        prices {
          amount
          currency
        }
      }
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
