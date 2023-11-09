import gql from 'graphql-tag'
import Link from 'next/link'

import { TEST_ID } from '~/common/enums'
import { toPath } from '~/common/utils'
import { NoticeActorNameUserFragment } from '~/gql/graphql'

import styles from './styles.module.css'

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
      <a
        className={styles.displayName}
        data-test-id={TEST_ID.NOTICE_USER_DISPLAY_NAME}
      >
        {user.displayName}
      </a>
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
