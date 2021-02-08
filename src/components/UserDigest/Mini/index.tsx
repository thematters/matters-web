import classNames from 'classnames'

import { LinkWrapper, Translate } from '~/components'
import { Avatar, AvatarProps, AvatarSize } from '~/components/Avatar'

import { toPath } from '~/common/utils'

import { fragments } from './gql'
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

export type UserDigestMiniProps = {
  user: UserDigestMiniUser

  avatarSize?: Extract<AvatarSize, 'xs' | 'sm' | 'md' | 'lg'>
  textSize?: 'xs' | 'sm-s' | 'sm' | 'md-s' | 'md'
  textWeight?: 'md'
  nameColor?: 'black' | 'white' | 'grey-darker' | 'green'
  direction?: 'row' | 'column'

  hasAvatar?: boolean
  hasDisplayName?: boolean
  hasUserName?: boolean

  disabled?: boolean
  onClick?: () => void
} & AvatarProps

const Mini = ({
  user,

  avatarSize,
  textSize = 'sm',
  textWeight,
  nameColor = 'black',
  direction = 'row',

  hasAvatar,
  hasDisplayName,
  hasUserName,
  disabled,

  onClick,
}: UserDigestMiniProps) => {
  const isArchived = user?.status?.state === 'archived'
  const path = toPath({
    page: 'userProfile',
    userName: user.userName || '',
  })
  const containerClasses = classNames({
    container: true,
    [`text-size-${textSize}`]: !!textSize,
    [`text-weight-${textWeight}`]: !!textWeight,
    [`name-color-${nameColor}`]: !!nameColor,
    hasAvatar,
    disabled: disabled || isArchived,
  })
  const nameClasses = classNames({
    name: true,
    [`direction-${direction}`]: !!direction,
  })

  if (isArchived) {
    return (
      <span className={containerClasses}>
        {hasAvatar && <Avatar size={avatarSize} />}

        <span className={nameClasses}>
          {hasDisplayName && (
            <span className="displayname">
              <Translate id="accountArchived" />
            </span>
          )}
        </span>

        <style jsx>{styles}</style>
      </span>
    )
  }

  return (
    <LinkWrapper {...path} disabled={disabled} onClick={onClick}>
      <section className={containerClasses}>
        {hasAvatar && <Avatar size={avatarSize} user={user} />}

        <span className={nameClasses}>
          {hasDisplayName && (
            <span className="displayname">{user.displayName}</span>
          )}
          {hasUserName && <span className="username">@{user.userName}</span>}
        </span>

        <style jsx>{styles}</style>
      </section>
    </LinkWrapper>
  )
}

Mini.fragments = fragments

export default Mini
