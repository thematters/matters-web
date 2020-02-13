import { DialogContent, DialogOverlay } from '@reach/dialog'
import classNames from 'classnames'
import { useRef } from 'react'
import { animated, useTransition } from 'react-spring'

import { useOutsideClick, useResponsive } from '~/components'

import Content from './Content'
import Footer from './Footer'
import Header from './Header'
import Message from './Message'
import styles from './styles.css'
import globalStyles from './styles.global.css'

export interface DialogOverlayProps {
  isOpen: boolean | undefined
  onDismiss: () => void
}

export type DialogProps = {
  title: string | React.ReactNode
  size?: 'sm' | 'lg'
} & DialogOverlayProps

const Overlay = (props: { style: React.CSSProperties }) => (
  <div aria-hidden className="overlay" {...props}>
    <style jsx>{styles}</style>
  </div>
)

const Handle = () => (
  <div className="handle">
    <style jsx>{styles}</style>
  </div>
)

export const Dialog: React.FC<DialogProps> & {
  Header: typeof Header
  Content: typeof Content
  Footer: typeof Footer
  Message: typeof Message
} = ({
  title,
  size = 'lg',

  isOpen,
  onDismiss,

  children
}) => {
  // const [mounted, setMounted] = useState(false)
  const node: React.RefObject<any> | null = useRef(null)

  useOutsideClick(node, onDismiss)

  const containerClass = classNames({
    container: true,
    'l-col-4 l-col-sm-6 l-offset-sm-1 l-col-md-4 l-offset-md-2 l-col-lg-6 l-offset-lg-3':
      size === 'lg',
    'l-col-4 l-col-sm-4 l-offset-sm-2 l-col-lg-4 l-offset-lg-4': size === 'sm'
  })

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

  return (
    <>
      {transitions.map(({ item, key, props: { opacity, transform } }) => {
        if (!item) {
          return
        }

        return (
          <AnimatedDialogOverlay key={key}>
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

                  <Header close={onDismiss}>{title}</Header>

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

Dialog.Header = Header
Dialog.Content = Content
Dialog.Footer = Footer
Dialog.Message = Message
