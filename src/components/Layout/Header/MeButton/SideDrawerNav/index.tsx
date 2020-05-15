import { DialogContent, DialogOverlay } from '@reach/dialog'
import { animated, useTransition } from 'react-spring'

import DrawerContent from './DrawerContent'
import Overlay from './Overlay'
import globalStyles from './styles.global.css'

export interface SideDrawerNavProps {
  isOpen: boolean | undefined
  onDismiss: () => void
}

const SideDrawerNav: React.FC<SideDrawerNavProps> = ({ isOpen, onDismiss }) => {
  const transitions = useTransition(isOpen, null, {
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
      {transitions.map(({ item, key, props: { opacity, transform } }) => {
        if (!item) {
          return
        }

        return (
          <AnimatedDrawerOverlay key={key} className="side-drawer-nav">
            <AnimatedOverlay style={{ opacity }} />

            <DialogContent aria-labelledby="菜單 - 我的">
              <AnimatedDrawerContent
                style={{ transform }}
                onDismiss={onDismiss}
              />
            </DialogContent>
          </AnimatedDrawerOverlay>
        )
      })}

      <style jsx global>
        {globalStyles}
      </style>
    </>
  )
}

export default SideDrawerNav
