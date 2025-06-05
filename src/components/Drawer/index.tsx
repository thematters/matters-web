import { useEffect, useState } from 'react'

import { CLOSE_OTHER_DRAWERS } from '~/common/enums'

import { useDrawerContext } from '../Context'
import { useEventListener } from '../Hook'
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
  const { hasOpeningDrawer, setHasOpeningDrawer } = useDrawerContext()
  const [needCloseOtherDrawers, setNeedCloseOtherDrawers] = useState(false)

  const [id, setId] = useState('')

  useEffect(() => {
    setId(crypto.randomUUID())
  }, [])

  useEventListener(CLOSE_OTHER_DRAWERS, (detail: { id: string }) => {
    if (!isOpen) {
      return
    }

    if (detail.id === id) {
      return
    }

    onClose()
  })

  useEffect(() => {
    if (isOpen) {
      setMounted(true)
      if (hasOpeningDrawer) {
        setNeedCloseOtherDrawers(true)
      }
    } else {
      setShowDrawer(false)
      // Unmount BaseDrawer Component after close
      // setTimeout(() => setMounted(false), duration)
    }
  }, [isOpen])

  useEffect(() => {
    if (needCloseOtherDrawers) {
      window.dispatchEvent(
        new CustomEvent(CLOSE_OTHER_DRAWERS, {
          detail: { id },
        })
      )
      setNeedCloseOtherDrawers(false)
    }
  }, [needCloseOtherDrawers])

  useEffect(() => {
    if (isOpen && mounted && !hasOpeningDrawer) {
      setShowDrawer(true)
      setHasOpeningDrawer(true)
    }
  }, [isOpen, hasOpeningDrawer, mounted])

  if (!mounted) {
    return null
  }

  return (
    <BaseDrawer
      isOpen={showDrawer}
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
