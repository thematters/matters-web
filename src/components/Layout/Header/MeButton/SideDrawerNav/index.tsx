import { useRef } from 'react'
import { useIntl } from 'react-intl'
import { animated, useTransition } from 'react-spring'

import { DialogContent, DialogOverlay } from '~/components/Dialog/vendors'

import DrawerContent from './DrawerContent'
import Overlay from './Overlay'
import styles from './styles.module.css'

export interface SideDrawerNavProps {
  isOpen: boolean | undefined
  onDismiss: () => void
}

const SideDrawerNav: React.FC<SideDrawerNavProps> = ({ isOpen, onDismiss }) => {
  const intl = useIntl()

  const closeButtonRef: React.RefObject<any> | null = useRef(null)

  const transition = useTransition(isOpen ? [true] : [], {
    from: {
      opacity: 0,
      transform: `translateX(-100%)`,
    },
    enter: { opacity: 1, transform: `translateX(0%)` },
    leave: {
      opacity: 0,
      transform: `translateX(-100%)`,
    },
    config: { tension: 270, friction: 30 },
  })

  const AnimatedDrawerOverlay = animated(DialogOverlay)
  const AnimatedDrawerContent = animated(DrawerContent)
  const AnimatedOverlay = animated(Overlay)

  return (
    <>
      {transition(({ opacity, transform }) => (
        <AnimatedDrawerOverlay
          className={styles.overlay}
          initialFocusRef={closeButtonRef}
        >
          <AnimatedOverlay style={{ opacity: opacity as any }} />

          {/* @ts-ignore - The type definition for DialogContent is incorrect */}
          <DialogContent
            className={styles.content}
            aria-labelledby={intl.formatMessage({
              defaultMessage: 'Menu: Me',
              id: 'cv6yHm',
            })}
          >
            <AnimatedDrawerContent
              style={{ transform }}
              onDismiss={onDismiss}
            />
          </DialogContent>
        </AnimatedDrawerOverlay>
      ))}
    </>
  )
}

export default SideDrawerNav
