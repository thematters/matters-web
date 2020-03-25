import classNames from 'classnames'
import gql from 'graphql-tag'
import Link from 'next/link'
import React from 'react'

import { Card, CardProps, Translate } from '~/components'
import { Avatar } from '~/components/Avatar'
import { FollowButton } from '~/components/Buttons/Follow'
import { UnblockUserButton } from '~/components/Buttons/UnblockUser'

import { toPath } from '~/common/utils'

import styles from './styles.css'

import { UserDigestRichUser } from './__generated__/UserDigestRichUser'

/**
 * UeserDigest.Rich is a component for presenting user's avatar, display
 * name, description and follower/followee state.
 *
 * Usage:
 *
 *   <UserDigest.Rich user={user} />
 */

type RichProps = {
  user: UserDigestRichUser

  size?: 'sm' | 'lg'
  avatarBadge?: React.ReactNode

  hasFollow?: boolean
  hasState?: boolean
  hasUnblock?: boolean
} & CardProps

const fragments = {
  user: gql`
    fragment UserDigestRichUser on User {
      id
      userName
      displayName
      info {
        description
      }
      status {
        state
      }
      ...AvatarUser
      ...FollowStateUser
      ...FollowButtonUser
      ...UnblockUserButtonUser
    }
    ${Avatar.fragments.user}
    ${FollowButton.State.fragments.user}
    ${FollowButton.fragments.user}
    ${UnblockUserButton.fragments.user}
  `,
}

const Rich = ({
  user,

  size = 'lg',
  avatarBadge,

  hasFollow = true,
  hasState = true,
  hasUnblock,

  ...cardProps
}: RichProps) => {
  const path = toPath({
    page: 'userProfile',
    userName: user.userName || '',
  })
  const isArchived = user?.status?.state === 'archived'
  const containerClass = classNames({
    container: true,
    [`size-${size}`]: !!size,
    disabled: isArchived,
  })

  if (isArchived) {
    return (
      <Card spacing={['tight', 'tight']} {...cardProps}>
        <section className={containerClass}>
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
      <section className={containerClass}>
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
            {hasState && <FollowButton.State user={user} />}
          </header>

          {user.info.description && (
            <p className="description">{user.info.description}</p>
          )}
        </section>

        <section className="extra-button">
          {hasUnblock && <UnblockUserButton user={user} />}
          {hasFollow && <FollowButton user={user} size="md-s" />}
        </section>

        <style jsx>{styles}</style>
      </section>
    </Card>
  )
}

/**
 * Memoizing
 */
type MemoedRichType = React.MemoExoticComponent<React.FC<RichProps>> & {
  fragments: typeof fragments
}

const MemoedRich = React.memo(Rich, ({ user: prevUser }, { user }) => {
  return (
    prevUser.isFollowee === user.isFollowee &&
    prevUser.isFollower === user.isFollower &&
    prevUser.isBlocked === user.isBlocked
  )
}) as MemoedRichType

MemoedRich.fragments = fragments

export default MemoedRich
