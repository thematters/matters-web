import gql from 'graphql-tag'

import { AvatarSize } from '~/components/Avatar'
import { UserDigest } from '~/components/UserDigest'
import { NoticeActorAvatarUserFragment } from '~/gql/graphql'

export const NoticeActorAvatar = ({
  user,
  size = 32,
}: {
  user: NoticeActorAvatarUserFragment | null
  size?: AvatarSize
}) => {
  if (!user) {
    return null
  }

  return <UserDigest.Mini user={user} avatarSize={32} hasAvatar />
}

NoticeActorAvatar.fragments = {
  user: gql`
    fragment NoticeActorAvatarUser on User {
      id
      userName
      displayName
      ...UserDigestMiniUser
    }
    ${UserDigest.Mini.fragments.user}
  `,
}

export default NoticeActorAvatar
