import gql from 'graphql-tag'

import { UserDigest } from '~/components/UserDigest'
import { NoticeActorAvatarUserFragment } from '~/gql/graphql'

export const NoticeActorAvatar = ({
  user,
}: {
  user?: NoticeActorAvatarUserFragment
}) => {
  return <UserDigest.Mini user={user} avatarSize={40} hasAvatar />
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
