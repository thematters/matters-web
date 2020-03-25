import classNames from 'classnames'

import { Avatar, AvatarProps, Viewer } from '~/components'

import styles from './styles.css'

type MeAvatarProps = {
  active?: boolean
  user: Viewer
} & AvatarProps

const MeAvatar: React.FC<MeAvatarProps> = ({
  active,
  size = 'md',
  user,
  ...avatarProps
}) => {
  const meAvatarClass = classNames({
    'me-avatar': true,
    active: !user.isInactive && active,
  })

  return (
    <div className={meAvatarClass}>
      <Avatar
        size={size}
        user={!user.isInactive ? user : undefined}
        {...avatarProps}
      />
      <style jsx>{styles}</style>
    </div>
  )
}

export default MeAvatar
