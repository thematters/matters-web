import gql from 'graphql-tag'
import Link from 'next/link'
import { FormattedMessage } from 'react-intl'

import { MAX_USER_DISPLAY_NAME_LENGTH, TEST_ID } from '~/common/enums'
import { toPath, truncate } from '~/common/utils'
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

  const isArchived = user?.status?.state === 'archived'

  if (isArchived) {
    return (
      <span className={styles.archivedDisplayname}>
        <FormattedMessage defaultMessage="Account Archived" id="YS8YSV" />
      </span>
    )
  }

  const path = toPath({
    page: 'userProfile',
    userName: user.userName || '',
  })

  return (
    <Link
      {...path}
      className={styles.displayName}
      data-test-id={TEST_ID.NOTICE_USER_DISPLAY_NAME}
    >
      {user.displayName &&
      user.displayName.length > MAX_USER_DISPLAY_NAME_LENGTH
        ? truncate(user.displayName, 8, 8)
        : user.displayName}
    </Link>
  )
}

NoticeActorName.fragments = {
  user: gql`
    fragment NoticeActorNameUser on User {
      id
      userName
      displayName
      status {
        state
      }
    }
  `,
}

export default NoticeActorName
