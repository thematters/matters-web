import { DialogContent, DialogOverlay } from '@reach/dialog'
import classNames from 'classnames'
import { useEffect, useRef, useState } from 'react'
import { animated, useSpring } from 'react-spring'
import { useDrag } from 'react-use-gesture'

import { useOutsideClick, useResponsive } from '~/components'

import Handle from './Handle'
import Overlay from './Overlay'
import styles from './styles.css'
import globalStyles from './styles.global.css'

export interface DialogOverlayProps {
  isOpen: boolean | undefined
  onDismiss: () => void
}

export type DialogProps = {
  size?: 'sm' | 'lg'
  fixedHeight?: boolean
} & DialogOverlayProps

const Dialog: React.FC<DialogProps> = ({
  size = 'lg',
  fixedHeight,

  isOpen,
  onDismiss,

  children,
}) => {
  const [mounted, setMounted] = useState(isOpen)
  const [fadeIn, setFadeIn] = useState(false)
  const node: React.RefObject<any> | null = useRef(null)
  const isSmallUp = useResponsive('sm-up')

  // Drag
  const [{ top }, setDragGoal] = useSpring(() => ({
    top: 0,
  }))

  // Fade In/ Fade Out
  const { opacity, transform } = useSpring({
    opacity: fadeIn ? 1 : 0,
    transform: fadeIn ? 'translateY(0%)' : 'translateY(90%)',
    config: { tension: 270, friction: isSmallUp ? undefined : 30 },
    onRest: (props) => {
      if (props.opacity === 0) {
        setMounted(false)
      }
    },
    // onDestroyed: () => {
    //   setDragGoal({ top: 0 })
    // },
  })

  useEffect(() => {
    if (isOpen) {
      setMounted(true)
      setFadeIn(true)
    } else {
      setFadeIn(false)
    }
  })

  useOutsideClick(node, onDismiss)

  const Container: React.FC<{
    style?: React.CSSProperties
  }> = ({ ...props }) => {
    const containerClass = classNames({
      container: true,
      'fixed-height': !!fixedHeight,
      'l-col-4 l-col-sm-6 l-offset-sm-1 l-col-md-5 l-offset-md-2 l-col-lg-6 l-offset-lg-3':
        size === 'lg',
      'l-col-4 l-col-sm-4 l-offset-sm-2 l-col-lg-4 l-offset-lg-4':
        size === 'sm',
    })

    const bind = useDrag(({ down, movement: [, my] }) => {
      if (!down && my > 30) {
        onDismiss()
      } else {
        setDragGoal({ top: down ? Math.max(my, -30) : 0 })
      }
    })

    return (
      <div ref={node} className={containerClass} {...props}>
        {children}

        {!isSmallUp && <Handle {...bind()} close={onDismiss} />}

        <style jsx>{styles}</style>
      </div>
    )
  }

  const AnimatedDialogOverlay = animated(DialogOverlay)
  const AnimatedContainer = animated(Container)
  const AnimatedOverlay = animated(Overlay)

  if (!mounted) {
    return null
  }

  return (
    <>
      <AnimatedDialogOverlay className="dialog">
        <AnimatedOverlay style={{ opacity }} />

        <DialogContent className="l-row full" aria-labelledby="dialog-title">
          <AnimatedContainer
            style={{
              transform: !isSmallUp && transform ? transform : undefined,
              opacity: isSmallUp ? opacity : undefined,
              top,
            }}
          />
        </DialogContent>
      </AnimatedDialogOverlay>

      <style jsx global>
        {globalStyles}
      </style>
    </>
  )
}

export default Dialog
