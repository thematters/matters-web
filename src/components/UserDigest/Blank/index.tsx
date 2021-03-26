import classNames from 'classnames'

import { Avatar, AvatarSize } from '~/components/Avatar'

import styles from './styles.css'

/**
 * UserDigest.Blank is a component for presenting visitor's:
 *
 * - email
 *
 * Usage:
 *
 *   <UserDigest.Blank user={user} />
 */

export type UserDigestBlankProps = {
  user: { email: string }

  avatarSize?: Extract<AvatarSize, 'xs' | 'sm' | 'md' | 'lg'>
  textSize?: 'xs' | 'sm-s' | 'sm' | 'md-s' | 'md'
  textWeight?: 'md'
  nameColor?: 'black' | 'white' | 'grey-darker' | 'green'
  direction?: 'row' | 'column'

  hasAvatar?: boolean

  disabled?: boolean
  onClick?: () => void
}

const Blank = ({
  user,

  avatarSize,
  textSize = 'sm',
  textWeight,
  nameColor = 'black',
  direction = 'row',

  hasAvatar,
  disabled,

  onClick,
}: UserDigestBlankProps) => {
  const containerClasses = classNames({
    container: true,
    [`text-size-${textSize}`]: !!textSize,
    [`text-weight-${textWeight}`]: !!textWeight,
    [`name-color-${nameColor}`]: !!nameColor,
    hasAvatar,
    disabled,
  })
  const nameClasses = classNames({
    name: true,
    [`direction-${direction}`]: !!direction,
  })

  return (
    <section className={containerClasses}>
      {hasAvatar && <Avatar size={avatarSize} />}

      <span className={nameClasses}>
        <span className="email">{user.email}</span>
      </span>

      <style jsx>{styles}</style>
    </section>
  )
}

export default Blank
