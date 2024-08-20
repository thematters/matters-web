import classNames from 'classnames'

import { AvatarSize } from '.'
import styles from './styles.module.css'

interface AvatarPlaceholderProps {
  size: AvatarSize
}

export const Placeholder = ({ size }: AvatarPlaceholderProps) => {
  const placeholderClasses = classNames(styles.placeholder, {
    [styles[`size${size}`]]: size,
  })
  return <div className={placeholderClasses} />
}
