import { DialogContent, DialogOverlay } from '@reach/dialog'
import classNames from 'classnames'
import { useEffect, useState } from 'react'

import Content from './Content'
import Footer from './Footer'
import Header from './Header'
import styles from './styles.css'
import globalStyles from './styles.global.css'

interface DialogProps {
  title: string
  defaultShowDialog?: boolean
  size?: 'sm' | 'lg'

  children: (props: DialogInstanceProps) => React.ReactNode
}

export interface DialogInstanceProps {
  close: () => void
}

export const Dialog = ({
  title,
  defaultShowDialog = true,
  size = 'lg',

  children
}: DialogProps) => {
  const [mounted, setMounted] = useState(false)
  const [showDialog, setShowDialog] = useState(defaultShowDialog)
  // const open = () => setShowDialog(true)
  const close = () => setShowDialog(false)

  const containerClass = classNames({
    container: true,
    'l-col-4 l-col-sm-6 l-offset-sm-1 l-col-md-4 l-offset-md-2 l-col-lg-6 l-offset-lg-3':
      size === 'lg',
    'l-col-4 l-col-sm-4 l-offset-sm-2 l-col-lg-4 l-offset-lg-4': size === 'sm'
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div style={{ '--reach-dialog': 1 } as React.CSSProperties}>
      <DialogOverlay isOpen={showDialog} onDismiss={close}>
        <DialogContent aria-label={title}>
          <div className="l-row">
            <div className={containerClass}>
              <Header close={close}>{title}</Header>

              {children({
                close
              })}
            </div>
          </div>
        </DialogContent>
      </DialogOverlay>

      <style jsx global>
        {globalStyles}
      </style>
      <style jsx>{styles}</style>
    </div>
  )
}

Dialog.Header = Header
Dialog.Content = Content
Dialog.Footer = Footer
