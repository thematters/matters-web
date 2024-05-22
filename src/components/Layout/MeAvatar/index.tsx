import classNames from 'classnames'

import { Avatar, AvatarProps, Viewer } from '~/components'

import styles from './styles.module.css'

type MeAvatarProps = {
  active?: boolean
  user: Viewer
} & AvatarProps

const MeAvatar: React.FC<MeAvatarProps> = ({
  active,
  size = 24,
  user,
  ...avatarProps
}) => {
  const meAvatarClasses = classNames({
    [styles.meAvatar]: true,
    [styles.active]: !user.isInactive && active,
  })

  return (
    <div className={meAvatarClasses}>
      <Avatar
        size={size}
        user={!user.isInactive ? user : undefined}
        {...avatarProps}
      />
    </div>
  )
}

export default MeAvatar
