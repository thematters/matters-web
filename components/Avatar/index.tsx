// external
import classNames from 'classnames'
import gql from 'graphql-tag'

import ICON_AVATAR_DEFAULT from '~/static/icons/avatar-default.svg'
import styles from './styles.css'

type AvatarSize =
  | 'xxsmall'
  | 'xsmall'
  | 'small'
  | 'default'
  | 'large'
  | 'xlarge'

interface AvatarProps {
  size?: AvatarSize
  user?: {
    avatar?: string
  }
  [key: string]: any
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
} = ({ user, size = 'default', className, ...restProps }) => {
  const src = (user && user.avatar) || ICON_AVATAR_DEFAULT
  const avatarClasses = classNames({
    [size]: true,
    [className]: !!className
  })

  return (
    <>
      <img src={src} className={avatarClasses} {...restProps} />
      <style jsx>{styles}</style>
    </>
  )
}

Avatar.fragments = fragments
