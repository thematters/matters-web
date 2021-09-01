import gql from 'graphql-tag'

import { BlockUser } from '~/components/BlockUser'

import { EditProfileDialog } from './EditProfileDialog'

export const fragments = {
  user: {
    public: gql`
      fragment DropdownActionsUserPublic on User {
        id
        userName
        ownCircles {
          id
          owner {
            id
          }
        }
        ...BlockUserPublic
        ...EditProfileDialogUserPublic
      }
      ${BlockUser.fragments.user.public}
      ${EditProfileDialog.fragments.user}
    `,
    private: gql`
      fragment DropdownActionsUserPrivate on User {
        id
        ownCircles {
          id
          isMember
        }
        ...BlockUserPrivate
      }
      ${BlockUser.fragments.user.private}
    `,
  },
}
