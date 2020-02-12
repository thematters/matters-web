import { DialogContent, DialogOverlay } from '@reach/dialog'
import classNames from 'classnames'
import { useEffect, useState } from 'react'

import Button from './Button'
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

export const Dialog: React.FC<DialogProps> & {
  Header: typeof Header
  Content: typeof Content
  Footer: typeof Footer
  Button: typeof Button
  Message: typeof Message
} = ({
  title,
  size = 'lg',

  isOpen,
  onDismiss,

  children
}) => {
  // Prevent SSR
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const containerClass = classNames({
    container: true,
    'l-col-4 l-col-sm-6 l-offset-sm-1 l-col-md-4 l-offset-md-2 l-col-lg-6 l-offset-lg-3':
      size === 'lg',
    'l-col-4 l-col-sm-4 l-offset-sm-2 l-col-lg-4 l-offset-lg-4': size === 'sm'
  })

  return (
    <>
      <DialogOverlay isOpen={isOpen} onDismiss={onDismiss}>
        <DialogContent aria-labelledby="dialog-title">
          <div className="l-row">
            <div className={containerClass}>
              <Header close={onDismiss}>{title}</Header>

              {children}
            </div>
          </div>
        </DialogContent>
      </DialogOverlay>

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
Dialog.Button = Button
Dialog.Message = Message
