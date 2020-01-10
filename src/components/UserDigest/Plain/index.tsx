import classNames from 'classnames'
import gql from 'graphql-tag'
import Link from 'next/link'

import { Translate } from '~/components'

import { TEXT } from '~/common/enums'
import { toPath } from '~/common/utils'

import styles from './styles.css'

import { UserDigestPlainUser } from './__generated__/UserDigestPlainUser'

/**
 * UserDigest.Plain is a component for presenting user's display name.
 *
 * Usage:
 *
 *   <UserDigest.Plain user={user} />
 */

interface MiniProps {
  user: UserDigestPlainUser
  hasUserName?: boolean
}

const fragments = {
  user: gql`
    fragment UserDigestPlainUser on User {
      id
      userName
      displayName
      status {
        state
      }
    }
  `
}

const Plain = ({ user, hasUserName }: MiniProps) => {
  const path = toPath({
    page: 'userProfile',
    userName: user.userName || ''
  })
  const containerClasses = classNames({
    container: true
  })
  const isArchived = user?.status?.state === 'archived'

  if (isArchived) {
    return (
      <span className={containerClasses}>
        <span className="name">
          <Translate
            zh_hant={TEXT.zh_hant.accountArchived}
            zh_hans={TEXT.zh_hans.accountArchived}
          />
        </span>

        <style jsx>{styles}</style>
      </span>
    )
  }

  return (
    <Link {...path}>
      <a className={containerClasses}>
        <span className="name">{user.displayName}</span>

        {hasUserName && <span className="username">@{user.userName}</span>}

        <style jsx>{styles}</style>
      </a>
    </Link>
  )
}

Plain.fragments = fragments

export default Plain
