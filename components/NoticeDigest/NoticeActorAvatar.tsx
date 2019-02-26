import gql from 'graphql-tag'

import { Avatar } from '~/components/Avatar'

const NoticeActorAvatar = () => null

NoticeActorAvatar.fragments = {
  user: gql`
    fragment NoticeActorAvatarUser on User {
      id
      userName
      ...AvatarUser
    }
    ${Avatar.fragments.user}
  `
}

export default NoticeActorAvatar
