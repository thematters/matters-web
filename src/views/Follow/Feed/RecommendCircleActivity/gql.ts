import gql from 'graphql-tag'

import FollowingRecommendCircle from '../FollowingRecommendCircle'

export const fragments = gql`
  fragment RecommendCircleActivity on CircleRecommendationActivity {
    recommendCircles: nodes {
      ...FollowingFeedRecommendCirclePublic
      ...FollowingFeedRecommendCirclePrivate
    }
  }
  ${FollowingRecommendCircle.fragments.circle.public}
  ${FollowingRecommendCircle.fragments.circle.private}
`
