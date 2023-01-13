import gql from 'graphql-tag'
import Link from 'next/link'

import { toPath } from '~/common/utils'
import { NoticeActorNameUserFragment } from '~/gql/graphql'

const NoticeActorName = ({
  user,
}: {
  user: NoticeActorNameUserFragment | null
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
