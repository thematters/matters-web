import { useEffect, useState } from 'react'

import { BaseDrawer } from './BaseDrawer'
import { TextButton } from './Buttons'
import Content from './Content'
import Header from './Header'
import styles from './styles.module.css'

export type DrawerProps = {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  size?: string
  duration?: number
  enableOverlay?: boolean
  direction?: 'left' | 'right'
}

export const Drawer: React.ComponentType<
  React.PropsWithChildren<DrawerProps>
> & {
  Header: typeof Header
  Content: typeof Content
  TextButton: typeof TextButton
} = ({
  isOpen,
  onClose,
  children,
  size,
  duration = 300,
  enableOverlay = false,
  direction = 'right',
}) => {
  const [mounted, setMounted] = useState(isOpen)
  const [showDrawer, setShowDrawer] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setMounted(true)
      setTimeout(() => setShowDrawer(true), 0)
    } else {
      setShowDrawer(false)
      setTimeout(() => setMounted(false), duration)
    }
  }, [isOpen])

  if (!mounted) {
    return null
  }

  return (
    <BaseDrawer
      open={showDrawer}
      onClose={onClose}
      className={styles.drawer}
      direction={direction}
      enableOverlay={enableOverlay}
      duration={duration}
      size={size}
    >
      {children}
    </BaseDrawer>
  )
}

Drawer.Header = Header
Drawer.Content = Content
Drawer.TextButton = TextButton
