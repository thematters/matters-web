import classNames from 'classnames'

import ICON_AVATAR_DEFAULT from '~/static/icons/avatar-default.svg'
import styles from './styles.css'

type AvatarSize = 'xsmall' | 'small' | 'default' | 'large' | 'xlarge'

interface AvatarProps {
  size?: AvatarSize
  [key: string]: any
}

export const Avatar: React.SFC<AvatarProps> = ({
  src = ICON_AVATAR_DEFAULT,
  size = 'default',
  className,
  ...restProps
}) => {
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
