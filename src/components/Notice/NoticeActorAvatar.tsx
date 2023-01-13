import gql from 'graphql-tag'
import Link from 'next/link'

import { toPath } from '~/common/utils'
import { Avatar } from '~/components/Avatar'
import { NoticeActorAvatarUserFragment } from '~/gql/graphql'

const NoticeActorAvatar = ({
  user,
  size = 'lg',
}: {
  user: NoticeActorAvatarUserFragment | null
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
  `,
}

export default NoticeActorAvatar
