import classNames from 'classnames'

import { Avatar, AvatarProps } from '~/components'

import styles from './styles.css'

type MeAvatarProps = {
  active?: boolean
} & AvatarProps

const MeAvatar: React.FC<MeAvatarProps> = ({
  active,
  size = 'md',
  ...avatarProps
}) => {
  const meAvatarClass = classNames({
    'me-avatar': true,
    active
  })

  return (
    <div className={meAvatarClass}>
      <Avatar size={size} {...avatarProps} />
      <style jsx>{styles}</style>
    </div>
  )
}

export default MeAvatar
