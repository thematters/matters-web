import { VisuallyHidden } from '@reach/visually-hidden'
import gql from 'graphql-tag'
import Link from 'next/link'

import { toPath } from '~/common/utils'
import { Avatar } from '~/components/Avatar'
import { NoticeActorAvatarUserFragment } from '~/gql/graphql'

import styles from './styles.module.css'

export type size = 'md' | 'lg'

export const NoticeActorAvatar = ({
  user,
  size = 'lg',
}: {
  user: NoticeActorAvatarUserFragment | null
  size?: size
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
      <a className={styles.noticeActorAvatar}>
        <VisuallyHidden>
          <span>{user.displayName}</span>
        </VisuallyHidden>
        <Avatar user={user} size={size} title={user.displayName || ''} />
      </a>
    </Link>
  )
}

NoticeActorAvatar.fragments = {
  user: gql`
    fragment NoticeActorAvatarUser on User {
      id
      userName
      displayName
      ...AvatarUser
    }
    ${Avatar.fragments.user}
  `,
}

export default NoticeActorAvatar
