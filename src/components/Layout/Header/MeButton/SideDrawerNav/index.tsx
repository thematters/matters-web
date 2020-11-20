import { DialogContent, DialogOverlay } from '@reach/dialog'
import { useEffect, useRef } from 'react'
import { animated, Globals, useTransition } from 'react-spring'

import DrawerContent from './DrawerContent'
import Overlay from './Overlay'
import globalStyles from './styles.global.css'

export interface SideDrawerNavProps {
  isOpen: boolean | undefined
  onDismiss: () => void
}

const SideDrawerNav: React.FC<SideDrawerNavProps> = ({ isOpen, onDismiss }) => {
  const closeButtonRef: React.RefObject<any> | null = useRef(null)

  // FIXME: https://github.com/react-spring/react-spring/issues/664#issuecomment-585748356
  useEffect(() => {
    if (performance.mark && performance.getEntries) {
      performance.mark('dummy_check')
      const entries = performance.getEntries()

      Globals.assign({
        skipAnimation: entries && entries.length === 0,
      })
    }
  }, [])

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
          initialFocusRef={closeButtonRef}
          className="side-drawer-nav"
        >
          <AnimatedOverlay style={{ opacity: opacity as any }} />

          <DialogContent aria-labelledby="菜單 - 我的">
            <AnimatedDrawerContent
              style={{ transform }}
              onDismiss={onDismiss}
            />
          </DialogContent>
        </AnimatedDrawerOverlay>
      ))}

      <style jsx global>
        {globalStyles}
      </style>
    </>
  )
}

export default SideDrawerNav
