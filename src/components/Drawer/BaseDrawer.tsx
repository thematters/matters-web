// ref: https://github.com/Farzin-Firoozi/react-modern-drawer

import classNames from 'classnames'
import { CSSProperties } from 'react'

import styles from './styles.module.css'

type BaseDrawerProps = {
  open: boolean
  onClose?: () => void
  direction: 'left' | 'right' | 'top' | 'bottom'
  children?: React.ReactNode
  duration?: number
  zIndex?: number
  enableOverlay?: boolean
  className?: string
  size?: number | string
}

const getDirectionStyle = (
  dir: string,
  size?: number | string
): {} | React.CSSProperties => {
  switch (dir) {
    case 'left':
      return {
        top: 0,
        left: 0,
        transform: 'translate3d(-100%, 0, 0)',
        width: size,
        height: '100vh',
      }
    case 'right':
      return {
        top: 0,
        right: 0,
        transform: 'translate3d(100%, 0, 0)',
        width: size,
        height: '100vh',
      }
    case 'bottom':
      return {
        left: 0,
        right: 0,
        bottom: 0,
        transform: 'translate3d(0, 100%, 0)',
        width: '100%',
        height: size,
      }
    case 'top':
      return {
        left: 0,
        right: 0,
        top: 0,
        transform: 'translate3d(0, -100%, 0)',
        width: '100%',
        height: size,
      }

    default:
      return {}
  }
}

export const BaseDrawer = ({
  open,
  onClose,
  direction,
  children,
  duration = 200,
  zIndex = 100,
  enableOverlay,
  className,
  size,
}: BaseDrawerProps) => {
  const drawerStyles: CSSProperties = {
    zIndex: zIndex,
    transitionDuration: `${duration}ms`,
    ...getDirectionStyle(direction, size),
  }

  const containerClasses = classNames({
    [styles.baseDrawerContainer]: true,
  })

  return (
    <div className={styles.baseDrawer}>
      <input
        type="checkbox"
        className={styles.baseDrawerCheckbox}
        onChange={onClose}
        checked={open}
      />
      <nav
        role="navigation"
        style={drawerStyles}
        className={`${containerClasses} ${className}`}
      >
        {children}
      </nav>
    </div>
  )
}
