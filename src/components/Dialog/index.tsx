import { DialogContent, DialogOverlay } from '@reach/dialog'
import { VisuallyHidden } from '@reach/visually-hidden'
import classNames from 'classnames'
import { useEffect, useRef, useState } from 'react'

import { KEYVALUE } from '~/common/enums'
import { capitalizeFirstLetter, dom } from '~/common/utils'
import { useOutsideClick } from '~/components'

import { RoundedButton, TextButton } from './Buttons'
import Content from './Content'
import Footer from './Footer'
import Header from './Header'
import Lazy from './Lazy'
import styles from './styles.module.css'

export interface DialogOverlayProps {
  isOpen: boolean | undefined
  onDismiss: () => void
  onRest?: () => void
  dismissOnClickOutside?: boolean
  dismissOnHandle?: boolean
}

export type DialogProps = {
  smBgColor?: 'greyLighter'
  smUpBgColor?: 'greyLighter'
  hidePaddingBottom?: boolean

  testId?: string
  scrollable?: boolean
} & DialogOverlayProps

const Container: React.FC<
  React.PropsWithChildren<
    {
      style?: React.CSSProperties
      initialFocusRef: React.RefObject<any>
    } & DialogProps
  >
> = ({
  smBgColor,
  smUpBgColor,
  hidePaddingBottom,
  testId,
  onDismiss,
  dismissOnClickOutside = false,
  dismissOnHandle = true,
  children,
  style,
  initialFocusRef,
}) => {
  const node: React.RefObject<any> | null = useRef(null)

  const containerClasses = classNames({
    [styles.container]: true,
    [smBgColor ? styles[`bg${capitalizeFirstLetter(smBgColor)}`] : '']:
      !!smBgColor,
    [smUpBgColor ? styles[`bg${capitalizeFirstLetter(smUpBgColor)}SmUp`] : '']:
      !!smUpBgColor,
    [styles.hidePaddingBottom]: !!hidePaddingBottom,
  })

  const closeTopDialog = () => {
    const dialogs = Array.prototype.slice.call(
      dom.$$('[data-reach-dialog-overlay]')
    ) as Element[]
    const topDialog = dialogs[dialogs.length - 1]
    const isTopDialog =
      topDialog && node.current && topDialog.contains(node.current)

    if (!isTopDialog) {
      return
    }

    onDismiss()
  }

  const handleClickOutside = () => {
    if (!dismissOnClickOutside) {
      return
    }

    closeTopDialog()
  }

  useOutsideClick(node, handleClickOutside)

  return (
    <div
      {...(testId ? { 'data-test-id': testId } : {})}
      ref={node}
      className={containerClasses}
      style={style}
      onKeyDown={(event) => {
        if (event.code.toLowerCase() !== KEYVALUE.escape) {
          return
        }
        if (!dismissOnHandle) {
          return
        }
        closeTopDialog()
      }}
    >
      <VisuallyHidden>
        <button type="button" ref={initialFocusRef} aria-hidden="true" />
      </VisuallyHidden>

      {children}
    </div>
  )
}

export const Dialog: React.ComponentType<
  React.PropsWithChildren<DialogProps>
> & {
  Header: typeof Header
  Content: typeof Content
  Footer: typeof Footer
  TextButton: typeof TextButton
  RoundedButton: typeof RoundedButton
  Lazy: typeof Lazy
} = (props) => {
  const { isOpen, onRest, scrollable } = props
  const [mounted, setMounted] = useState(isOpen)
  const initialFocusRef = useRef<any>(null)

  useEffect(() => {
    if (isOpen) {
      setMounted(true)
    } else {
      setMounted(false)

      if (onRest) {
        onRest()
      }
    }
  })

  const dialogOverlayClasses = classNames({
    dialog: true,
    [styles.scrollable]: !!scrollable,
    [styles.overlay]: !!mounted,
  })

  if (!mounted) {
    return null
  }

  return (
    <>
      <DialogOverlay
        className={dialogOverlayClasses}
        initialFocusRef={initialFocusRef}
        dangerouslyBypassFocusLock
        allowPinchZoom
      >
        <DialogContent aria-labelledby="dialog-title">
          <Container initialFocusRef={initialFocusRef} {...props} />
        </DialogContent>
      </DialogOverlay>
    </>
  )
}

Dialog.Header = Header
Dialog.Content = Content
Dialog.Footer = Footer
Dialog.TextButton = TextButton
Dialog.RoundedButton = RoundedButton
Dialog.Lazy = Lazy
