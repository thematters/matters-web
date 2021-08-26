import gql from 'graphql-tag'

import Followers from './Followers'
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
    }
  }
  ${Followers.fragments.user}
  ${Profile.fragments.user}
`
