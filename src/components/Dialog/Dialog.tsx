import { DialogContent, DialogOverlay } from '@reach/dialog'
import classNames from 'classnames'
import { useRef } from 'react'
import { animated, useTransition } from 'react-spring'

import { useOutsideClick, useResponsive } from '~/components'

import Handle from './Handle'
import Header from './Header'
import Overlay from './Overlay'
import styles from './styles.css'
import globalStyles from './styles.global.css'

export interface DialogOverlayProps {
  isOpen: boolean | undefined
  onDismiss: () => void
}

export type DialogProps = {
  title: string | React.ReactNode
  size?: 'sm' | 'lg'
  showHeader?: boolean
} & DialogOverlayProps

const Dialog: React.FC<DialogProps> = ({
  title,
  size = 'lg',
  showHeader = true,

  isOpen,
  onDismiss,

  children
}) => {
  const node: React.RefObject<any> | null = useRef(null)
  const closeButtonRef: React.RefObject<any> | null = useRef(null)

  const isSmallUp = useResponsive({ type: 'sm-up' })()
  const AnimatedDialogOverlay = animated(DialogOverlay)
  const AnimatedDialogContent = animated(DialogContent)
  const AnimatedOverlay = animated(Overlay)
  const values = {
    from: {
      opacity: 0,
      transform: isSmallUp ? 'translate3d(0,0%,0)' : 'translate3d(0,100%,0)'
    },
    enter: { opacity: 1, transform: 'translate3d(0,0%,0)' },
    leave: {
      opacity: 0,
      transform: isSmallUp ? 'translate3d(0,0%,0)' : 'translate3d(0,100%,0)'
    },
    config: { tension: 270, friction: isSmallUp ? undefined : 30 }
  }
  const transitions = useTransition(isOpen, null, values)

  const containerClass = classNames({
    container: true,
    'no-header': !showHeader,
    'l-col-4 l-col-sm-6 l-offset-sm-1 l-col-md-4 l-offset-md-2 l-col-lg-6 l-offset-lg-3':
      size === 'lg',
    'l-col-4 l-col-sm-4 l-offset-sm-2 l-col-lg-4 l-offset-lg-4': size === 'sm'
  })

  useOutsideClick(node, onDismiss)

  return (
    <>
      {transitions.map(({ item, key, props: { opacity, transform } }) => {
        if (!item) {
          return
        }

        return (
          <AnimatedDialogOverlay initialFocusRef={closeButtonRef} key={key}>
            <AnimatedOverlay style={{ opacity }} />
            <AnimatedDialogContent
              aria-labelledby="dialog-title"
              style={{
                transform,
                opacity: isSmallUp ? opacity : 1
              }}
            >
              <div className="l-row full">
                <div ref={node} className={containerClass}>
                  {!isSmallUp && <Handle />}

                  <Header
                    close={onDismiss}
                    showHeader={showHeader}
                    ref={closeButtonRef}
                  >
                    {title}
                  </Header>

                  {children}
                </div>
              </div>
            </AnimatedDialogContent>
          </AnimatedDialogOverlay>
        )
      })}

      <style jsx global>
        {globalStyles}
      </style>
      <style jsx>{styles}</style>
    </>
  )
}

export default Dialog
