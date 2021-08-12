import gql from 'graphql-tag'

import { CircleAvatar, SubscribeCircleDialog } from '~/components'

import Footer from './Footer'

export const fragments = {
  circle: {
    public: gql`
      fragment FollowingFeedRecommendCirclePublic on Circle {
        id
        name
        displayName
        description
        ...AvatarCircle
        ...SubscribeCirclePublic
        ...FollowingFeedRecommendCircleFooterPublic
      }
      ${CircleAvatar.fragments.circle}
      ${SubscribeCircleDialog.fragments.circle.public}
      ${Footer.fragments.circle.public}
    `,
    private: gql`
      fragment FollowingFeedRecommendCirclePrivate on Circle {
        id
        ...SubscribeCirclePrivate
        ...FollowingFeedRecommendCircleFooterPrivate
      }
      ${SubscribeCircleDialog.fragments.circle.private}
      ${Footer.fragments.circle.private}
    `,
  },
}
