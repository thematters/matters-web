import gql from 'graphql-tag'

import { Avatar } from '~/components/Avatar'
import { FollowButton } from '~/components/Buttons/Follow'
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
      ${FollowButton.State.fragments.user.private}
      ${FollowButton.fragments.user.private}
      ${UnblockUserButton.fragments.user.private}
    `,
  },
}
