// external
import classNames from 'classnames'
import gql from 'graphql-tag'

import ICON_AVATAR_DEFAULT from '~/static/icons/avatar-default.svg'

import { AvatarUser } from './__generated__/AvatarUser'
import styles from './styles.css'

type AvatarSize =
  | 'xxsmall'
  | 'xsmall'
  | 'small'
  | 'default'
  | 'large'
  | 'xlarge'

const fragments = {
  user: gql`
    fragment AvatarUser on User {
      avatar
    }
  `
}

export const Avatar = ({
  user,
  size = 'default'
}: {
  size?: AvatarSize
  user: AvatarUser
}) => {
  const src = (user && user.avatar) || ICON_AVATAR_DEFAULT
  const avatarClasses = classNames({
    avatar: true,
    [size]: true
  })

  return (
    <>
      <div
        className={avatarClasses}
        style={{ backgroundImage: `url(${src})` }}
      />
      <style jsx>{styles}</style>
    </>
  )
}

Avatar.fragments = fragments
