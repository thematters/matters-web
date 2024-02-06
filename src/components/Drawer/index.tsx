import { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'

import { IconArrowLeft24, IconClose24 } from '~/components'

import { BaseDrawer } from './BaseDrawer'
import styles from './styles.module.css'

export type DrawerProps = {
  isOpen: boolean
  title: string
  onClose: () => void
  children: React.ReactNode
  size?: string
  duration?: number
  enableOverlay?: boolean
  direction?: 'left' | 'right'
  backTo?: () => void
}

export const Drawer = ({
  isOpen,
  onClose,
  title,
  children,
  size,
  duration = 300,
  enableOverlay = false,
  direction = 'right',
  backTo,
}: DrawerProps) => {
  const [mounted, setMounted] = useState(isOpen)
  const [showDrawer, setShowDrawer] = useState(false)
  const intl = useIntl()

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
      <section className={styles.header}>
        {backTo && (
          <button
            className={styles.close}
            onClick={backTo}
            aria-label={intl.formatMessage({
              defaultMessage: 'Back',
              id: 'cyR7Kh',
            })}
          >
            <IconArrowLeft24 size="md" />
          </button>
        )}

        <h2>{title}</h2>

        <button
          className={styles.close}
          onClick={onClose}
          aria-label={intl.formatMessage({
            defaultMessage: 'Close',
            id: 'rbrahO',
          })}
        >
          <IconClose24 size="md" />
        </button>
      </section>
      {children}
    </BaseDrawer>
  )
}
