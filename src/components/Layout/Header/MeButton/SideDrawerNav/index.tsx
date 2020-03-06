import { DialogContent, DialogOverlay } from '@reach/dialog'
import { useRef } from 'react'
import { animated, useTransition } from 'react-spring'

import { useOutsideClick } from '~/components'

import NavMenu from '../../../NavMenu'
import styles from './styles.css'
import globalStyles from './styles.global.css'

export interface SideDrawerNavProps {
  isOpen: boolean | undefined
  onDismiss: () => void
}

const Dialog: React.FC<SideDrawerNavProps> = ({ isOpen, onDismiss }) => {
  const node: React.RefObject<any> | null = useRef(null)
  const closeButtonRef: React.RefObject<any> | null = useRef(null)

  const transitions = useTransition(isOpen, null, {
    from: {
      opacity: 0,
      transform: `translateX(0%)`
    },
    enter: { opacity: 1, transform: `translateX(100%)` },
    leave: {
      opacity: 0,
      transform: `translateX(0%)`
    },
    config: { tension: 270, friction: 30 }
  })

  useOutsideClick(node, onDismiss)

  const Container: React.FC<{ style?: React.CSSProperties }> = ({
    ...props
  }) => (
    <nav ref={node} {...props}>
      <NavMenu.Top />
      <NavMenu.Bottom />
      <style jsx>{styles}</style>
    </nav>
  )

  const Overlay = ({ style }: { style: React.CSSProperties }) => (
    <div aria-hidden className="overlay" style={style}>
      <style jsx>{styles}</style>
    </div>
  )

  const AnimatedDrawerOverlay = animated(DialogOverlay)
  const AnimatedContainer = animated(Container)
  const AnimatedOverlay = animated(Overlay)

  return (
    <>
      {transitions.map(({ item, key, props: { opacity, transform } }) => {
        if (!item) {
          return
        }

        return (
          <AnimatedDrawerOverlay
            initialFocusRef={closeButtonRef}
            key={key}
            className="side-drawer-nav"
          >
            <AnimatedOverlay style={{ opacity }} />

            <DialogContent aria-labelledby="菜單 - 我的">
              <AnimatedContainer style={{ transform }} />
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

export default Dialog
