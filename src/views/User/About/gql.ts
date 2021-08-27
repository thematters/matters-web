import gql from 'graphql-tag'

import Followers from './Followers'
import Following from './Following'
import Profile from './Profile'

export const USER_ABOUT_PUBLIC = gql`
  query UserAboutUserPublic($userName: String!) {
    user(input: { userName: $userName }) {
      id
      status {
        state
      }
      ...UserAboutFollowersUser
      ...UserAboutProfileUser
      ...FollowingFeedTypeUser
    }
  }
  ${Followers.fragments.user}
  ${Profile.fragments.user}
  ${Following.fragments.user}
`
