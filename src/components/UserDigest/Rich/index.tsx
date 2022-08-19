import classNames from 'classnames'
import Link from 'next/link'
import React from 'react'

import { Card, CardProps, Translate } from '~/components'
import { Avatar, AvatarProps } from '~/components/Avatar'
import { FollowUserButton } from '~/components/Buttons/FollowUser'
import { UnblockUserButton } from '~/components/Buttons/UnblockUser'

import { toPath } from '~/common/utils'

import { fragments } from './gql'
import styles from './styles.css'

import { UserDigestRichUserPrivate } from './__generated__/UserDigestRichUserPrivate'
import { UserDigestRichUserPublic } from './__generated__/UserDigestRichUserPublic'

/**
 * UeserDigest.Rich is a component for presenting user's avatar, display
 * name, description and follower/followee state.
 *
 * Usage:
 *
 *   <UserDigest.Rich user={user} />
 */
export type UserDigestRichProps = {
  user: UserDigestRichUserPublic & Partial<UserDigestRichUserPrivate>

  size?: 'sm' | 'lg'
  avatarBadge?: React.ReactNode
  descriptionReplacement?: React.ReactNode
  extraButton?: React.ReactNode

  hasFollow?: boolean
  hasState?: boolean
  hasUnblock?: boolean
  hasDescriptionReplacement?: boolean
  hasLengthLimit?: boolean
} & CardProps &
  AvatarProps

const Rich = ({
  user,

  size = 'lg',
  avatarBadge,
  descriptionReplacement,
  extraButton,

  hasFollow = true,
  hasState = true,
  hasUnblock,
  hasDescriptionReplacement = false,
  hasLengthLimit = false,

  ...cardProps
}: UserDigestRichProps) => {
  const path = toPath({
    page: 'userProfile',
    userName: user.userName || '',
  })
  const isArchived = user?.status?.state === 'archived'
  const containerClasses = classNames({
    container: true,
    [`size-${size}`]: !!size,
    disabled: isArchived,
    limit: hasLengthLimit,
  })

  if (isArchived) {
    return (
      <Card spacing={['tight', 'tight']} {...cardProps}>
        <section className={containerClasses}>
          <span className="avatar">
            <Avatar size={size === 'sm' ? 'lg' : 'xl'} />
          </span>

          <section className="content">
            <header>
              <span className="name">
                <Translate id="accountArchived" />
              </span>
            </header>
          </section>

          <section className="extra-button">
            {hasUnblock && <UnblockUserButton user={user} />}
          </section>

          <style jsx>{styles}</style>
        </section>
      </Card>
    )
  }

  return (
    <Card {...path} spacing={['tight', 'tight']} {...cardProps}>
      <section className={containerClasses}>
        <Link {...path}>
          <a className="avatar">
            <Avatar size={size === 'sm' ? 'lg' : 'xl'} user={user} />
            {avatarBadge && <span className="badge">{avatarBadge}</span>}
          </a>
        </Link>

        <section className="content">
          <header>
            <Link {...path}>
              <a className="name">{user.displayName}</a>
            </Link>
            {hasState && <FollowUserButton.State user={user} />}
          </header>

          {!hasDescriptionReplacement && user.info.description && (
            <p className="description">{user.info.description}</p>
          )}
          {descriptionReplacement && (
            <p className="description">{descriptionReplacement}</p>
          )}
        </section>

        <section className="extra-button">
          {hasUnblock && <UnblockUserButton user={user} />}
          {hasFollow && <FollowUserButton user={user} size="md-s" />}
          {extraButton}
        </section>

        <style jsx>{styles}</style>
      </section>
    </Card>
  )
}

/**
 * Memoizing
 */
type MemoizedRichType = React.MemoExoticComponent<
  React.FC<UserDigestRichProps>
> & {
  fragments: typeof fragments
}

const MemoizedRich = React.memo(Rich, ({ user: prevUser }, { user }) => {
  return (
    prevUser.id === user.id &&
    prevUser.isFollowee === user.isFollowee &&
    prevUser.isFollower === user.isFollower &&
    prevUser.isBlocked === user.isBlocked
  )
}) as MemoizedRichType

MemoizedRich.fragments = fragments

export default MemoizedRich
