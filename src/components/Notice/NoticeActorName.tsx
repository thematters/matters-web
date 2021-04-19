import { gql } from '@apollo/client'
import Link from 'next/link'

import { toPath } from '~/common/utils'

import { NoticeActorNameUser } from './__generated__/NoticeActorNameUser'

const NoticeActorName = ({ user }: { user: NoticeActorNameUser | null }) => {
  if (!user) {
    return null
  }

  const path = toPath({
    page: 'userProfile',
    userName: user.userName || '',
  })

  return (
    <Link {...path}>
      <a>{user.displayName}</a>
    </Link>
  )
}

NoticeActorName.fragments = {
  user: gql`
    fragment NoticeActorNameUser on User {
      id
      userName
      displayName
    }
  `,
}

export default NoticeActorName
