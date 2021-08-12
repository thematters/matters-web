import gql from 'graphql-tag'

import { Avatar } from '~/components/Avatar'
import { FollowUserButton } from '~/components/Buttons/FollowUser'

export const fragments = {
  user: {
    public: gql`
      fragment FollowingFeedRecommendUserPublic on User {
        id
        userName
        displayName
        info {
          description
        }
        status {
          state
        }
        ...AvatarUser
      }
      ${Avatar.fragments.user}
    `,
    private: gql`
      fragment FollowingFeedRecommendUserPrivate on User {
        id
        ...FollowStateUserPrivate
        ...FollowButtonUserPrivate
      }
      ${FollowUserButton.State.fragments.user.private}
      ${FollowUserButton.fragments.user.private}
    `,
  },
}
