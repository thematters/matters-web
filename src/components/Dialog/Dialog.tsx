import { DialogContent, DialogOverlay } from '@reach/dialog'
import classNames from 'classnames'
import { useRef } from 'react'
import { animated, useSpring, useTransition } from 'react-spring'
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

  children
}) => {
  const node: React.RefObject<any> | null = useRef(null)
  const closeButtonRef: React.RefObject<any> | null = useRef(null)

  // drag animation
  const [{ top }, setDragGoal] = useSpring(() => ({
    top: 0
  }))

  const isSmallUp = useResponsive('sm-up')
  const transitions = useTransition(isOpen, null, {
    from: {
      opacity: 0,
      transform: `translateY(100%)`
    },
    enter: { opacity: 1, transform: `translateY(0%)` },
    leave: {
      opacity: 0,
      transform: `translateY(100%)`
    },
    config: { tension: 270, friction: isSmallUp ? undefined : 30 },
    onDestroyed: () => {
      setDragGoal({ top: 0 })
    }
  })

  useOutsideClick(node, onDismiss)

  const Container: React.FC<{
    style?: React.CSSProperties
  }> = ({ ...props }) => {
    const containerClass = classNames({
      container: true,
      'fixed-height': !!fixedHeight,
      'l-col-4 l-col-sm-6 l-offset-sm-1 l-col-md-4 l-offset-md-2 l-col-lg-6 l-offset-lg-3':
        size === 'lg',
      'l-col-4 l-col-sm-4 l-offset-sm-2 l-col-lg-4 l-offset-lg-4': size === 'sm'
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

  return (
    <>
      {transitions.map(({ item, key, props: { opacity, transform } }) => {
        if (!item) {
          return
        }

        return (
          <AnimatedDialogOverlay
            initialFocusRef={closeButtonRef}
            key={key}
            className="dialog"
          >
            <AnimatedOverlay style={{ opacity }} />

            <DialogContent
              className="l-row full"
              aria-labelledby="dialog-title"
            >
              <AnimatedContainer
                style={{
                  transform: !isSmallUp && transform ? transform : undefined,
                  opacity: isSmallUp ? opacity : undefined,
                  top
                }}
              />
            </DialogContent>
          </AnimatedDialogOverlay>
        )
      })}

      <style jsx global>
        {globalStyles}
      </style>
    </>
  )
}

export default Dialog
