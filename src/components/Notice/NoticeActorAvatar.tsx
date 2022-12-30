import gql from 'graphql-tag'
import Link from 'next/link'

import { toPath } from '~/common/utils'
import { Avatar } from '~/components/Avatar'

import { NoticeActorAvatarUser } from './__generated__/NoticeActorAvatarUser'

const NoticeActorAvatar = ({
  user,
  size = 'lg',
}: {
  user: NoticeActorAvatarUser | null
  size?: 'md' | 'lg'
}) => {
  if (!user) {
    return null
  }

  const path = toPath({
    page: 'userProfile',
    userName: user.userName || '',
  })

  return (
    <Link {...path}>
      <Avatar user={user} size={size} />
    </Link>
  )
}

NoticeActorAvatar.fragments = {
  user: gql`
    fragment NoticeActorAvatarUser on User {
      id
      userName
      ...AvatarUser
    }
    ${Avatar.fragments.user}
  `,
}

export default NoticeActorAvatar
