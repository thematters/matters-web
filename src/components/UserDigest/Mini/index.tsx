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
 * UserDigest.Mini is a component for presenting user's:
 *
 * - avatar
 * - userName
 * - displayName
 *
 * Usage:
 *
 *   <UserDigest.Mini user={user} />
 */

interface MiniProps {
  user: UserDigestMiniUser

  avatarSize?: Extract<AvatarSize, 'xs' | 'sm' | 'md' | 'lg'>
  textSize?: 'xs' | 'sm-s' | 'sm' | 'md-s' | 'md'
  textWeight?: 'md'
  nameColor?: 'black' | 'white' | 'grey-darker'
  direction?: 'row' | 'column'

  hasAvatar?: boolean
  hasDisplayName?: boolean
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

  avatarSize,
  textSize = 'sm',
  textWeight,
  nameColor = 'black',
  direction = 'row',

  hasAvatar,
  hasDisplayName,
  hasUserName
}: MiniProps) => {
  const path = toPath({
    page: 'userProfile',
    userName: user.userName || ''
  })
  const containerClass = classNames({
    container: true,
    [`text-size-${textSize}`]: !!textSize,
    [`text-weight-${textWeight}`]: !!textWeight,
    [`name-color-${nameColor}`]: !!nameColor,
    hasAvatar
  })
  const nameClass = classNames({
    name: true,
    [`direction-${direction}`]: !!direction
  })
  const isArchived = user?.status?.state === 'archived'

  if (isArchived) {
    return (
      <span className={containerClass}>
        {hasAvatar && <Avatar size={avatarSize} />}

        <span className={nameClass}>
          {hasDisplayName && (
            <span className="displayname">
              <Translate
                zh_hant={TEXT.zh_hant.accountArchived}
                zh_hans={TEXT.zh_hans.accountArchived}
              />
            </span>
          )}
        </span>

        <style jsx>{styles}</style>
      </span>
    )
  }

  return (
    <Link {...path}>
      <a className={containerClass} onClick={e => e.stopPropagation()}>
        {hasAvatar && <Avatar size={avatarSize} user={user} />}

        <span className={nameClass}>
          {hasDisplayName && (
            <span className="displayname">{user.displayName}</span>
          )}
          {hasUserName && <span className="username">@{user.userName}</span>}
        </span>

        <style jsx>{styles}</style>
      </a>
    </Link>
  )
}

Mini.fragments = fragments

export default Mini
