import classNames from 'classnames'
import Link from 'next/link'

import { TEST_ID } from '~/common/enums'
import { toPath } from '~/common/utils'
import { UserDigestPlainUserFragment } from '~/gql/graphql'

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
  const path = toPath({
    page: 'userProfile',
    userName: user.userName || '',
  })

  const containerClasses = classNames({
    [styles.container]: true,
    [styles.disabled]: disabled,
  })

  const displayNameClasses = classNames({
    [styles.name]: true,
    [styles.hasUnderline]: hasUnderline,
  })

  if (disabled) {
    return (
      <section className={containerClasses}>
        <span className={displayNameClasses}>{user.displayName}</span>
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
