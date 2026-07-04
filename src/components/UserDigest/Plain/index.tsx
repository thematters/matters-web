import classNames from 'classnames'
import Link from 'next/link'
import { FormattedMessage } from 'react-intl'

import { TEST_ID } from '~/common/enums'
import { toPath } from '~/common/utils'
import { UserDigestPlainUserFragment, UserState } from '~/gql/graphql'

import { fragments } from './gql'
import styles from './styles.module.css'

export type UserDigestPlainProps = {
  user: UserDigestPlainUserFragment

  disabled?: boolean
  hasUnderline?: boolean
  onClick?: () => void
}

const Plain = ({
  user,
  disabled,
  onClick,
  hasUnderline,
}: UserDigestPlainProps) => {
  const userState = user.status?.state
  const isArchived = userState === UserState.Archived
  const isFrozen = userState === UserState.Frozen
  const isInactive = isArchived || isFrozen
  const path = toPath({
    page: 'userProfile',
    userName: user.userName || '',
  })

  const containerClasses = classNames({
    [styles.container]: true,
    [styles.disabled]: disabled || isInactive,
  })

  const displayNameClasses = classNames({
    [styles.name]: true,
    [styles.hasUnderline]: hasUnderline,
  })

  if (disabled || isInactive) {
    return (
      <section className={containerClasses}>
        <span className={displayNameClasses}>
          {isFrozen ? (
            <FormattedMessage defaultMessage="Account Frozen" id="sE2Ui3" />
          ) : isArchived ? (
            <FormattedMessage defaultMessage="Account Archived" id="YS8YSV" />
          ) : (
            user.displayName
          )}
        </span>
      </section>
    )
  }

  return (
    <Link {...path} onClick={onClick} data-test-id={TEST_ID.DIGEST_USER_PLAIN}>
      <section className={containerClasses}>
        <span className={displayNameClasses}>{user.displayName}</span>
      </section>
    </Link>
  )
}

Plain.fragments = fragments

export default Plain
