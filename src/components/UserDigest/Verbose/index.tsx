import { VisuallyHidden } from '@reach/visually-hidden'
import classNames from 'classnames'
import Link from 'next/link'
import React from 'react'

import { TEST_ID } from '~/common/enums'
import { capitalizeFirstLetter, toPath } from '~/common/utils'
import { Card, CardProps, Translate } from '~/components'
import { Avatar, AvatarProps } from '~/components/Avatar'
import { FollowUserButton } from '~/components/Buttons/FollowUser'
import { UnblockUserButton } from '~/components/Buttons/UnblockUser'
import {
  UserDigestVerboseUserPrivateFragment,
  UserDigestVerboseUserPublicFragment,
} from '~/gql/graphql'

import { fragments } from './gql'
import styles from './styles.module.css'

/**
 * UeserDigest.Verbose is a component for presenting user's avatar, display
 * name, multi-line description and follower/followee state.
 *
 * Usage:
 *
 *   <UserDigest.Verbose user={user} />
 */
export type UserDigestVerboseProps = {
  user: UserDigestVerboseUserPublicFragment &
    Partial<UserDigestVerboseUserPrivateFragment>

  avatarSize?: 'md'
  nameTextSize?: 'mdS'
  descTextSize?: 'smS'
  descRowSize?: 2

  hasFollow?: boolean
  hasUnblock?: boolean
} & CardProps &
  AvatarProps

const Verbose = ({
  user,

  avatarSize = 'md',
  nameTextSize = 'mdS',
  descTextSize = 'smS',
  descRowSize = 2,

  hasFollow = true,
  hasUnblock,

  ...cardProps
}: UserDigestVerboseProps) => {
  const path = toPath({
    page: 'userProfile',
    userName: user.userName || '',
  })
  const isArchived = user?.status?.state === 'archived'
  const containerClasses = classNames({
    [styles.container]: true,
    [styles.disabled]: isArchived,
  })
  const nameClasses = classNames({
    [styles.name]: true,
    [styles[`name${capitalizeFirstLetter(nameTextSize)}`]]: true,
  })
  const descClasses = classNames({
    [styles.desc]: true,
    [styles[`desc${descTextSize}`]]: true,
    [styles[`descRow${descRowSize}`]]: true,
  })

  if (isArchived) {
    return (
      <Card
        spacing={['tight', 'tight']}
        {...cardProps}
        testId={TEST_ID.DIGEST_USER_VERBOSE}
      >
        <section className={containerClasses}>
          <span className={styles.avatar}>
            <Avatar size={avatarSize} />
          </span>

          <section className={styles.content}>
            <header className={styles.header}>
              <span className={nameClasses}>
                <Translate id="accountArchived" />
              </span>
            </header>
          </section>

          <section className={styles.extraButton}>
            {hasUnblock && <UnblockUserButton user={user} />}
          </section>
        </section>
      </Card>
    )
  }

  return (
    <Card
      {...path}
      spacing={['tight', 'tight']}
      {...cardProps}
      testId={TEST_ID.DIGEST_USER_VERBOSE}
    >
      <section className={containerClasses}>
        <Link {...path} legacyBehavior>
          <a className={styles.avatar}>
            <VisuallyHidden>
              <span>{user.displayName}</span>
            </VisuallyHidden>
            <Avatar size={avatarSize} user={user} />
          </a>
        </Link>

        <section className={styles.content}>
          <header className={styles.header}>
            <Link {...path} legacyBehavior>
              <a className={nameClasses}>{user.displayName}</a>
            </Link>
          </header>
        </section>

        <section className={styles.extraButton}>
          {hasUnblock && <UnblockUserButton user={user} />}
          {hasFollow && <FollowUserButton user={user} />}
        </section>
      </section>

      {user.info.description && (
        <section className={descClasses}>
          <p>{user.info.description}</p>
        </section>
      )}
    </Card>
  )
}

/**
 * Memoizing
 */
type MemoizedVerboseType = React.MemoExoticComponent<
  React.FC<UserDigestVerboseProps>
> & {
  fragments: typeof fragments
}

const MemoizedVerbose = React.memo(Verbose, ({ user: prevUser }, { user }) => {
  return (
    prevUser.id === user.id &&
    prevUser.isFollowee === user.isFollowee &&
    prevUser.isFollower === user.isFollower &&
    prevUser.isBlocked === user.isBlocked
  )
}) as MemoizedVerboseType

MemoizedVerbose.fragments = fragments

export default MemoizedVerbose
