// ref: https://github.com/Farzin-Firoozi/react-modern-drawer

import classNames from 'classnames'
import { CSSProperties, useEffect, useRef } from 'react'

import { TEST_ID } from '~/common/enums'

import { useDrawerContext } from '../Context'
import styles from './styles.module.css'

type BaseDrawerProps = {
  isOpen: boolean
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
): object | React.CSSProperties => {
  switch (dir) {
    case 'left':
      return {
        top: 0,
        left: 0,
        transform: 'translate3d(-100%, 0, 0)',
        width: size,
        height: '100vh',
        overflowX: 'hidden',
      }
    case 'right':
      return {
        top: 0,
        right: 0,
        transform: 'translate3d(100%, 0, 0)',
        width: size,
        height: '100vh',
        overflowX: 'hidden',
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
  isOpen,
  onClose,
  direction,
  children,
  duration = 200,
  enableOverlay = false,
  className,
  size,
}: BaseDrawerProps) => {
  const drawerStyles: CSSProperties = {
    transitionDuration: `${duration}ms`,
    ...getDirectionStyle(direction, size),
  }

  const containerClasses = classNames({
    [styles.baseDrawerContainer]: true,
    open: isOpen, // for read timer to identify the state
  })

  const ref = useRef<HTMLElement>(null)

  const { setHasOpeningDrawer } = useDrawerContext()

  const idSuffix = Math.random().toString(36).substring(7)

  useEffect(() => {
    if (!enableOverlay) return

    const handleClickOutside = (e: Event) => {
      if (ref.current && !e.composedPath().includes(ref.current)) {
        onClose?.()
      }
    }

    const removeEventListener = () => {
      document.removeEventListener('click', handleClickOutside)
    }
    if (isOpen) {
      document.addEventListener('click', handleClickOutside)
    } else {
      removeEventListener()
    }

    return removeEventListener
  }, [isOpen])

  useEffect(() => {
    if (!ref.current) return
    const handleTransformEnd = (event: TransitionEvent) => {
      if (event.propertyName !== 'transform') return
      if (!isOpen) {
        setHasOpeningDrawer(false)
      }
    }
    ref.current.addEventListener('transitionend', handleTransformEnd)

    return () => {
      ref.current?.removeEventListener('transitionend', handleTransformEnd)
    }
  }, [ref, isOpen])

  return (
    <div className={styles.baseDrawer}>
      <input
        type="checkbox"
        id={'Drawer__checkbox' + idSuffix}
        className={styles.baseDrawerCheckbox}
        onChange={onClose}
        checked={isOpen}
      />
      <nav
        role="navigation"
        data-test-id={TEST_ID.DRAWER}
        style={drawerStyles}
        id={'Drawer__container' + idSuffix}
        className={`${containerClasses} ${className}`}
        ref={ref}
      >
        {children}
      </nav>
    </div>
  )
}
