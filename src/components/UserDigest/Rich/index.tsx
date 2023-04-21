import { VisuallyHidden } from '@reach/visually-hidden'
import classNames from 'classnames'
import Link from 'next/link'
import React from 'react'

import { TEST_ID } from '~/common/enums'
import { toPath } from '~/common/utils'
import { Card, CardProps, Translate } from '~/components'
import { Avatar, AvatarProps } from '~/components/Avatar'
import { FollowUserButton } from '~/components/Buttons/FollowUser'
import { UnblockUserButton } from '~/components/Buttons/UnblockUser'
import {
  UserDigestRichUserPrivateFragment,
  UserDigestRichUserPublicFragment,
} from '~/gql/graphql'

import { fragments } from './gql'
import styles from './styles.css'

/**
 * UeserDigest.Rich is a component for presenting user's avatar, display
 * name, description and follower/followee state.
 *
 * Usage:
 *
 *   <UserDigest.Rich user={user} />
 */
export type UserDigestRichProps = {
  user: UserDigestRichUserPublicFragment &
    Partial<UserDigestRichUserPrivateFragment>

  size?: 'sm' | 'lg'
  avatarBadge?: React.ReactNode
  descriptionReplacement?: React.ReactNode
  extraButton?: React.ReactNode

  hasFollow?: boolean
  hasState?: boolean
  hasUnblock?: boolean
  hasDescriptionReplacement?: boolean
  canClamp?: boolean
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
  canClamp = false,

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
  })

  const contentClasses = classNames({
    content: true,
    'has-extra-button': hasUnblock || hasFollow || !!extraButton,
  })

  if (isArchived) {
    return (
      <Card
        spacing={['tight', 'tight']}
        {...cardProps}
        testId={TEST_ID.DIGEST_USER_RICH}
        bgActiveColor="none"
      >
        <section className={containerClasses}>
          <span className="avatar">
            <Avatar size={size === 'sm' ? 'lg' : 'xl'} />
          </span>

          <section className={contentClasses}>
            <header className="header">
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
    <Card
      {...path}
      spacing={['tight', 'tight']}
      {...cardProps}
      testId={TEST_ID.DIGEST_USER_RICH}
      bgActiveColor="none"
    >
      <section className={containerClasses}>
        <Link {...path} legacyBehavior>
          <a className="avatar">
            <VisuallyHidden>
              <span>{user.displayName}</span>
            </VisuallyHidden>
            <Avatar size={size === 'sm' ? 'lg' : 'xl'} user={user} />
            {avatarBadge && <span className="badge">{avatarBadge}</span>}
          </a>
        </Link>

        <section className={contentClasses}>
          <header className="header">
            <Link {...path} legacyBehavior>
              <a
                className="name"
                data-test-id={TEST_ID.DIGEST_USER_RICH_DISPLAY_NAME}
              >
                {user.displayName}
              </a>
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
          {hasFollow && <FollowUserButton user={user} />}
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
