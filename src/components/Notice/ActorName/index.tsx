import gql from 'graphql-tag'
import Link from 'next/link'
import { FormattedMessage } from 'react-intl'

import { toPath } from '~/common/utils'
import { NoticeActorNameUserFragment } from '~/gql/graphql'

import styles from './styles.module.css'

const ActorName = ({ user }: { user: NoticeActorNameUserFragment | null }) => {
  if (!user) {
    return null
  }

  const isArchived = user?.status?.state === 'archived'
  if (isArchived) {
    return (
      <span className={styles.archived}>
        <FormattedMessage defaultMessage="Account Archived" id="YS8YSV" />
      </span>
    )
  }

  const path = toPath({
    page: 'userProfile',
    userName: user.userName || '',
  })

  return (
    <Link {...path} className={styles.displayName}>
      {user.displayName}
    </Link>
  )
}

ActorName.fragments = {
  user: gql`
    fragment ActorNameUser on User {
      id
      userName
      displayName
      status {
        state
      }
    }
  `,
}

export default ActorName
