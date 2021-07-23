import gql from 'graphql-tag'

import { Avatar } from '~/components/Avatar'
import { FollowUserButton } from '~/components/Buttons/FollowUser'
import { UnblockUserButton } from '~/components/Buttons/UnblockUser'

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
      }
      ${Avatar.fragments.user}
    `,
    private: gql`
      fragment UserDigestRichUserPrivate on User {
        id
        ...FollowStateUserPrivate
        ...FollowButtonUserPrivate
        ...UnblockUserButtonUserPrivate
      }
      ${FollowUserButton.State.fragments.user.private}
      ${FollowUserButton.fragments.user.private}
      ${UnblockUserButton.fragments.user.private}
    `,
  },
}
