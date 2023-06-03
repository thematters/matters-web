import classNames from 'classnames'

import { TEST_ID } from '~/common/enums'
import { toPath } from '~/common/utils'
import { LinkWrapper, Translate } from '~/components'
import { Avatar, AvatarProps, AvatarSize } from '~/components/Avatar'
import { UserDigestMiniUserFragment } from '~/gql/graphql'

import { fragments } from './gql'
import styles from './styles.module.css'

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
  user: UserDigestMiniUserFragment

  avatarSize?: Extract<AvatarSize, 'xs' | 'sm' | 'md' | 'lg'>
  textSize?: 'xs' | 'sm-s' | 'sm' | 'md-s' | 'md'
  textWeight?: 'md' | 'semibold'
  nameColor?: 'black' | 'white' | 'grey-darker' | 'green'
  direction?: 'row' | 'column'
  spacing?: 'xxtight' | 'xtight'

  hasAvatar?: boolean
  hasDisplayName?: boolean
  hasUserName?: boolean

  disabled?: boolean
  onClick?: () => void
} & AvatarProps

export const toUserDigestMiniPlaceholder = (displayName: string) =>
  ({
    __typename: 'User',
    id: '',
    userName: '',
    displayName,
    status: null,
    avatar: null,
    liker: {
      __typename: 'Liker',
      civicLiker: false,
    },
  } as UserDigestMiniUserFragment)

const Mini = ({
  user,

  avatarSize,
  textSize = 'sm',
  textWeight,
  nameColor = 'black',
  direction = 'row',
  spacing = 'xtight',

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
    [styles.container]: true,
    [styles[`text-size-${textSize}`]]: !!textSize,
    [styles[`text-weight-${textWeight}`]]: !!textWeight,
    [styles[`name-color-${nameColor}`]]: !!nameColor,
    [styles[`spacing-${spacing}`]]: !!spacing,
    [styles.hasAvatar]: hasAvatar,
    [styles.disabled]: disabled || isArchived,
  })
  const nameClasses = classNames({
    [styles.name]: true,
    [styles[`direction-${direction}`]]: !!direction,
  })

  if (isArchived) {
    return (
      <span
        className={containerClasses}
        data-test-id={TEST_ID.DIGEST_USER_MINI}
      >
        {hasAvatar && <Avatar size={avatarSize} />}

        <span className={nameClasses}>
          {hasDisplayName && (
            <span className={styles['displayname']}>
              <Translate id="accountArchived" />
            </span>
          )}
        </span>
      </span>
    )
  }

  return (
    <LinkWrapper
      {...path}
      disabled={disabled}
      onClick={onClick}
      testId={TEST_ID.DIGEST_USER_MINI}
    >
      <section className={containerClasses}>
        {hasAvatar && <Avatar size={avatarSize} user={user} />}

        <span className={nameClasses}>
          {hasDisplayName && (
            <span
              className={styles['displayname']}
              data-test-id={TEST_ID.DIGEST_USER_MINI_DISPLAY_NAME}
            >
              {user.displayName}
            </span>
          )}
          {hasUserName && user.userName && (
            <span
              className={styles['username']}
              data-test-id={TEST_ID.DIGEST_USER_MINI_USER_NAME}
            >
              @{user.userName}
            </span>
          )}
        </span>
      </section>
    </LinkWrapper>
  )
}

Mini.fragments = fragments

export default Mini
