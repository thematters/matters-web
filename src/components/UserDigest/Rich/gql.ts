import gql from 'graphql-tag'

import { Avatar } from '~/components/Avatar'
import { FollowUserButton } from '~/components/Buttons/FollowUser'

export const fragments = {
  user: {
    public: gql`
      fragment UserDigestRichUserPublic on User {
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
        ...AvatarUserLogbook
      }
      ${Avatar.fragments.user}
      ${Avatar.fragments.logbook}
    `,
    private: gql`
      fragment UserDigestRichUserPrivate on User {
        id
        ...FollowStateUserPrivate
        ...FollowButtonUserPrivate
      }
      ${FollowUserButton.State.fragments.user.private}
      ${FollowUserButton.fragments.user.private}
    `,
  },
}
