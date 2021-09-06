import { DialogContent, DialogOverlay } from '@reach/dialog'
import { useContext, useRef } from 'react'
import { animated, useTransition } from 'react-spring'

import { LanguageContext } from '~/components'

import { translate } from '~/common/utils'

import DrawerContent from './DrawerContent'
import Overlay from './Overlay'
import globalStyles from './styles.global.css'

export interface SideDrawerNavProps {
  isOpen: boolean | undefined
  onDismiss: () => void
}

const SideDrawerNav: React.FC<SideDrawerNavProps> = ({ isOpen, onDismiss }) => {
  const { lang } = useContext(LanguageContext)

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
          initialFocusRef={closeButtonRef}
          className="side-drawer-nav"
        >
          <AnimatedOverlay style={{ opacity: opacity as any }} />

          <DialogContent
            aria-labelledby={translate({
              zh_hant: '菜單 - 我的',
              zh_hans: '菜单 - 我的',
              en: 'Menu: Me',
              lang,
            })}
          >
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
