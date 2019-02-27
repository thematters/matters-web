import gql from 'graphql-tag'
import Link from 'next/link'

import { Avatar } from '~/components/Avatar'

import { toPath } from '~/common/utils'

import { NoticeActorAvatarUser } from './__generated__/NoticeActorAvatarUser'

const NoticeActorAvatar = ({
  user,
  size = 'default'
}: {
  user: NoticeActorAvatarUser
  size?: 'xsmall' | 'default'
}) => {
  const path = toPath({
    page: 'userProfile',
    userName: user.userName || ''
  })

  return (
    <Link {...path}>
      <a>
        <Avatar user={user} size={size} />
      </a>
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
  `
}

export default NoticeActorAvatar
