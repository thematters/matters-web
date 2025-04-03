import { VisuallyHidden } from '@reach/visually-hidden'
import classNames from 'classnames'
import Link from 'next/link'
import React from 'react'
import { FormattedMessage } from 'react-intl'

import { TEST_ID } from '~/common/enums'
import { capitalizeFirstLetter, toPath } from '~/common/utils'
import { Card, CardProps } from '~/components'
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
  user?: UserDigestRichUserPublicFragment &
    Partial<UserDigestRichUserPrivateFragment>

  size?: 'sm' | 'lg'
  avatarBadge?: React.ReactNode
  subtitle?: React.ReactNode
  extraButton?: React.ReactNode

  hasFollow?: boolean
  hasState?: boolean
  canClamp?: boolean
  isCard?: boolean
} & CardProps &
  Omit<AvatarProps, 'size'>

const Rich = ({
  user,

  size = 'lg',
  avatarBadge,
  subtitle,
  extraButton,

  hasFollow = true,
  hasState = true,
  canClamp = false,

  isCard = true,

  ...cardProps
}: UserDigestRichProps) => {
  const isArchived = user?.status?.state === 'archived'
  const containerClasses = classNames({
    [styles.container]: true,
    [styles[`size${capitalizeFirstLetter(size)}`]]: !!size,
    [styles.disabled]: isArchived,
  })

  const contentClasses = classNames({
    [styles.content]: true,
    [styles.hasExtraButton]: hasFollow || !!extraButton,
    [styles.archived]: isArchived,
  })

  if (isArchived || !user) {
    return (
      <Card
        spacing={[12, 12]}
        bgActiveColor="none"
        {...cardProps}
        onClick={undefined}
        testId={TEST_ID.DIGEST_USER_RICH}
      >
        <section className={containerClasses}>
          <span className={styles.avatar}>
            <Avatar size={size === 'sm' ? 32 : 48} />
          </span>

          <section className={contentClasses}>
            <header className={styles.header}>
              <span
                className={styles.name}
                data-test-id={TEST_ID.DIGEST_USER_RICH_DISPLAY_NAME}
              >
                {user ? (
                  <FormattedMessage
                    defaultMessage="Account Archived"
                    id="YS8YSV"
                  />
                ) : (
                  <FormattedMessage
                    defaultMessage="Anonymous User"
                    id="GclYG/"
                  />
                )}
              </span>
            </header>
          </section>

          <section className={styles.extraButton}>
            {hasFollow && user && <FollowUserButton user={user} />}
            {extraButton}
          </section>
        </section>
      </Card>
    )
  }

  const path = toPath({
    page: 'userProfile',
    userName: user.userName || '',
  })

  const isCardAsLink = cardProps.is === 'link'

  const AvatarContent = () => {
    return (
      <>
        <VisuallyHidden>
          <span>{user.displayName}</span>
        </VisuallyHidden>
        <Avatar size={size === 'sm' ? 32 : 48} user={user} />
        {avatarBadge && <span className={styles.badge}>{avatarBadge}</span>}
      </>
    )
  }

  return (
    <Card
      {...path}
      spacing={[12, 12]}
      bgActiveColor="none"
      {...cardProps}
      testId={TEST_ID.DIGEST_USER_RICH}
    >
      <section className={containerClasses}>
        {isCardAsLink ? (
          <span className={styles.avatar}>
            <AvatarContent />
          </span>
        ) : (
          <Link {...path} legacyBehavior>
            <a className={styles.avatar}>
              <AvatarContent />
            </a>
          </Link>
        )}
        <section className={contentClasses}>
          <header className={styles.header}>
            {isCardAsLink ? (
              <span
                className={styles.name}
                data-test-id={TEST_ID.DIGEST_USER_RICH_DISPLAY_NAME}
              >
                {user.displayName}
              </span>
            ) : (
              <Link {...path} legacyBehavior>
                <a
                  className={styles.name}
                  data-test-id={TEST_ID.DIGEST_USER_RICH_DISPLAY_NAME}
                >
                  {user.displayName}
                </a>
              </Link>
            )}
            {hasState && <FollowUserButton.State user={user} />}
          </header>

          {!subtitle && user.info.description && (
            <p className={styles.subtitle}>{user.info.description}</p>
          )}
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
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

const MemoizedRich = React.memo(
  Rich,
  ({ user: prevUser, ...prevProps }, { user, ...props }) => {
    return (
      prevUser?.id === user?.id &&
      prevUser?.isFollowee === user?.isFollowee &&
      prevUser?.isFollower === user?.isFollower &&
      prevProps.extraButton === props.extraButton
    )
  }
) as MemoizedRichType

MemoizedRich.fragments = fragments

export default MemoizedRich
