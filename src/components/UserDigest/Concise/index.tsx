import classNames from 'classnames'

import { capitalizeFirstLetter, toPath } from '~/common/utils'
import { LinkWrapper, Translate } from '~/components'
import { Avatar, AvatarProps, AvatarSize } from '~/components/Avatar'
import { UserDigestConciseUserFragment } from '~/gql/graphql'

import { fragments } from './gql'
import styles from './styles.module.css'

/**
 * UserDigest.Concise is a component for presenting user's:
 *
 * - avatar
 * - userName
 * - displayName
 *
 * Usage:
 *
 *   <UserDigest.Concise user={user} />
 */

export type UserDigestConciseProps = {
  user: UserDigestConciseUserFragment
  avatarSize?: Extract<AvatarSize, 'lg' | 'xl'>
  nameStyle?: 'tight' | 'loose'

  disabled?: boolean
  onClick?: () => void
} & AvatarProps

export const toUserDigestConcisePlaceholder = (displayName: string) =>
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
  }) as UserDigestConciseUserFragment

const Concise = ({
  user,
  avatarSize,
  nameStyle = 'loose',
  disabled,

  onClick,
}: UserDigestConciseProps) => {
  const isArchived = user?.status?.state === 'archived'
  const path = toPath({
    page: 'userProfile',
    userName: user.userName || '',
  })
  const containerClasses = classNames({
    [styles.container]: true,
    [styles.disabled]: disabled || isArchived,
  })
  const nameClasses = classNames({
    [styles.name]: true,
    [styles[`nameStyle${capitalizeFirstLetter(nameStyle)}`]]: !!nameStyle,
  })

  if (isArchived) {
    return (
      <span className={containerClasses}>
        <Avatar size={avatarSize} />

        <span className={nameClasses}>
          <span className={styles.displayname}>
            <Translate id="accountArchived" />
          </span>
        </span>
      </span>
    )
  }

  return (
    <LinkWrapper {...path} disabled={disabled} onClick={onClick}>
      <section className={containerClasses}>
        <Avatar size={avatarSize} user={user} />

        <span className={nameClasses}>
          <span className={styles.displayname}>{user.displayName}</span>
          {user.userName && (
            <span className={styles.username}>@{user.userName}</span>
          )}
        </span>
      </section>
    </LinkWrapper>
  )
}

Concise.fragments = fragments

export default Concise
