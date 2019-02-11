import classNames from 'classnames'

import ICON_AVATAR_DEFAULT from '~/static/icons/avatar-default.svg'
import styles from './styles.css'

type AvatarSizes = 'xsmall' | 'small' | 'default' | 'large' | 'xlarge'

interface AvatarProps {
  size?: AvatarSizes
  [key: string]: any
}

export const Avatar: React.SFC<AvatarProps> = ({
  src = ICON_AVATAR_DEFAULT,
  size = 'default',
  className,
  ...restProps
}) => {
  const avatarClass = classNames({
    [size]: true,
    [className]: !!className
  })

  return (
    <>
      <img src={src} className={avatarClass} {...restProps} />
      <style jsx>{styles}</style>
    </>
  )
}
