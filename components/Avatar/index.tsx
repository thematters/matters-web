// external
import classNames from 'classnames'
import gql from 'graphql-tag'

import ICON_AVATAR_DEFAULT from '~/static/icons/avatar-default.svg'

import { AvatarUser } from './__generated__/AvatarUser'
import styles from './styles.css'

type AvatarSize = 'xsmall' | 'small' | 'default' | 'large' | 'xlarge'

interface AvatarProps {
  size?: AvatarSize
  user: AvatarUser
}

const fragments = {
  user: gql`
    fragment AvatarUser on User {
      avatar
    }
  `
}

export const Avatar: React.SFC<AvatarProps> & {
  fragments: typeof fragments
} = ({ user, size = 'default' }) => {
  const src = (user && user.avatar) || ICON_AVATAR_DEFAULT
  const avatarClasses = classNames({
    [size]: true
  })

  return (
    <>
      <img src={src} className={avatarClasses} />
      <style jsx>{styles}</style>
    </>
  )
}

Avatar.fragments = fragments
