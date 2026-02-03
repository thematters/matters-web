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
  spacing?: number | string
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
  spacing,
}) => {
  const [showDrawer, setShowDrawer] = useState(isOpen)
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
      if (hasOpeningDrawer) {
        setNeedCloseOtherDrawers(true)
      }
    } else {
      setShowDrawer(false)
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
    if (isOpen && !hasOpeningDrawer) {
      setShowDrawer(true)
      setHasOpeningDrawer(true)
    }
  }, [isOpen, hasOpeningDrawer])

  return (
    <BaseDrawer
      isOpen={showDrawer}
      onClose={onClose}
      className={styles.drawer}
      direction={direction}
      enableOverlay={enableOverlay}
      duration={duration}
      size={size}
      spacing={spacing}
    >
      {children}
    </BaseDrawer>
  )
}

Drawer.Header = Header
Drawer.Content = Content
Drawer.TextButton = TextButton
