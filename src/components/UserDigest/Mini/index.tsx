import classNames from 'classnames'
import gql from 'graphql-tag'
import Link from 'next/link'

import { Translate } from '~/components'
import { Avatar, AvatarSize } from '~/components/Avatar'

import { TEXT } from '~/common/enums'
import { toPath } from '~/common/utils'

import styles from './styles.css'

import { UserDigestMiniUser } from './__generated__/UserDigestMiniUser'

/**
 * UserDigest.Mini is a component for presenting user's avatar and display name.
 *
 * Usage:
 *
 *   <UserDigest.Mini user={user} />
 */

interface MiniProps {
  user: UserDigestMiniUser
  avatarSize?: AvatarSize
  textSize?: 'xs' | 'sm' | 'sm-s'
  textWeight?: 'normal' | 'md'
  spacing?: 'xxtight' | 'xtight'
  hasUserName?: boolean
}

const fragments = {
  user: gql`
    fragment UserDigestMiniUser on User {
      id
      userName
      displayName
      status {
        state
      }
      ...AvatarUser
    }
    ${Avatar.fragments.user}
  `
}

const Mini = ({
  user,
  avatarSize = 'sm',
  textSize = 'sm',
  textWeight = 'normal',
  spacing = 'xtight',
  hasUserName
}: MiniProps) => {
  const path = toPath({
    page: 'userProfile',
    userName: user.userName || ''
  })
  const containerClasses = classNames({
    container: true,
    [`text-${textWeight}`]: true,
    [`spacing-${spacing}`]: true,
    [`text-${textSize}`]: true
  })
  const isArchived = user?.status?.state === 'archived'

  if (isArchived) {
    return (
      <section>
        <span className={containerClasses}>
          <Avatar size={avatarSize} />
          <span className="name-container">
            <span className="name">
              <Translate
                zh_hant={TEXT.zh_hant.accountArchived}
                zh_hans={TEXT.zh_hans.accountArchived}
              />
            </span>
          </span>
        </span>

        <style jsx>{styles}</style>
      </section>
    )
  }

  return (
    <section>
      <Link {...path}>
        <a className={containerClasses}>
          <Avatar size={avatarSize} user={user} />
          <span className="name-container">
            <span className="name">{user.displayName}</span>
            {hasUserName && <span className="username">@{user.userName}</span>}
          </span>
        </a>
      </Link>

      <style jsx>{styles}</style>
    </section>
  )
}

Mini.fragments = fragments

export default Mini
