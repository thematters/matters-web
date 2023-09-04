import { VisuallyHidden } from '@reach/visually-hidden'
import classNames from 'classnames'
import Link from 'next/link'
import React from 'react'

import { TEST_ID } from '~/common/enums'
import { capitalizeFirstLetter, toPath } from '~/common/utils'
import { Card, CardProps, Translate } from '~/components'
import { Avatar, AvatarProps } from '~/components/Avatar'
import { FollowUserButton } from '~/components/Buttons/FollowUser'
import {
  UserDigestRichUserPrivateFragment,
  UserDigestRichUserPublicFragment,
} from '~/gql/graphql'

import { fragments } from './gql'
import styles from './styles.module.css'

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
  canClamp = false,

  ...cardProps
}: UserDigestRichProps) => {
  const path = toPath({
    page: 'userProfile',
    userName: user.userName || '',
  })
  const isArchived = user?.status?.state === 'archived'
  const containerClasses = classNames({
    [styles.container]: true,
    [styles[`size${capitalizeFirstLetter(size)}`]]: !!size,
    [styles.disabled]: isArchived,
  })

  const contentClasses = classNames({
    [styles.content]: true,
    [styles.hasExtraButton]: hasFollow || !!extraButton,
  })

  if (isArchived) {
    return (
      <Card
        spacing={['tight', 'tight']}
        bgActiveColor="none"
        {...cardProps}
        testId={TEST_ID.DIGEST_USER_RICH}
      >
        <section className={containerClasses}>
          <span className={styles.avatar}>
            <Avatar size={size === 'sm' ? 'lg' : 'xl'} />
          </span>

          <section className={contentClasses}>
            <header className={styles.header}>
              <span className={styles.name}>
                <Translate id="accountArchived" />
              </span>
            </header>
          </section>

          <section className={styles.extraButton}>
            {hasFollow && <FollowUserButton user={user} />}
            {extraButton}
          </section>
        </section>
      </Card>
    )
  }

  return (
    <Card
      {...path}
      spacing={['tight', 'tight']}
      bgActiveColor="none"
      {...cardProps}
      testId={TEST_ID.DIGEST_USER_RICH}
    >
      <section className={containerClasses}>
        <Link {...path} legacyBehavior>
          <a className={styles.avatar}>
            <VisuallyHidden>
              <span>{user.displayName}</span>
            </VisuallyHidden>
            <Avatar size={size === 'sm' ? 'lg' : 'xl'} user={user} />
            {avatarBadge && <span className={styles.badge}>{avatarBadge}</span>}
          </a>
        </Link>

        <section className={contentClasses}>
          <header className={styles.header}>
            <Link {...path} legacyBehavior>
              <a
                className={styles.name}
                data-test-id={TEST_ID.DIGEST_USER_RICH_DISPLAY_NAME}
              >
                {user.displayName}
              </a>
            </Link>
            {hasState && <FollowUserButton.State user={user} />}
          </header>

          {!descriptionReplacement && user.info.description && (
            <p className={styles.description}>{user.info.description}</p>
          )}
          {descriptionReplacement && (
            <p className={styles.description}>{descriptionReplacement}</p>
          )}
        </section>

        <section className={styles.extraButton}>
          {hasFollow && <FollowUserButton user={user} />}
          {extraButton}
        </section>
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
    prevUser.isFollower === user.isFollower
  )
}) as MemoizedRichType

MemoizedRich.fragments = fragments

export default MemoizedRich
