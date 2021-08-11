import gql from 'graphql-tag'

import FollowingRecommendUser from '../FollowingRecommendUser'

export const fragments = gql`
  fragment RecommendUserActivity on UserRecommendationActivity {
    recommendUsers: nodes {
      ...FollowingFeedRecommendUserPublic
      ...FollowingFeedRecommendUserPrivate
    }
  }
  ${FollowingRecommendUser.fragments.user.public}
  ${FollowingRecommendUser.fragments.user.private}
`
