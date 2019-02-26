import gql from 'graphql-tag'

import NoticeActorAvatar from './NoticeActorAvatar'
import NoticeActorName from './NoticeActorName'

const UserNewFollowerNotice = () => null

UserNewFollowerNotice.fragments = {
  notice: gql`
    fragment UserNewFollowerNotice on UserNewFollowerNotice {
      actors {
        ...NoticeActorAvatarUser
        ...NoticeActorNameUser
      }
    }
    ${NoticeActorAvatar.fragments.user}
    ${NoticeActorName.fragments.user}
  `
}

export default UserNewFollowerNotice
