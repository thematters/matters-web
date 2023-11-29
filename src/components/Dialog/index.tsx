import { DialogContent, DialogOverlay } from '@reach/dialog'
import { VisuallyHidden } from '@reach/visually-hidden'
import classNames from 'classnames'
import _get from 'lodash/get'
import { useEffect, useRef, useState } from 'react'
import { animated, useSpring } from 'react-spring'
import { useDrag } from 'react-use-gesture'

import { KEYVALUE } from '~/common/enums'
import { capitalizeFirstLetter, dom } from '~/common/utils'
import { Media, useOutsideClick } from '~/components'

import { RoundedButton, TextButton } from './Buttons'
import Content from './Content'
import Footer from './Footer'
import Handle from './Handle'
import Header from './Header'
import Lazy from './Lazy'
import Message from './Message'
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
      setDragGoal: (val: any) => void
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
  setDragGoal,
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

  const bind = useDrag(({ down, movement: [, my] }) => {
    if (!down && my > 30) {
      onDismiss()
    } else {
      setDragGoal({ top: down ? Math.max(my, -30) : 0 })
    }
  })

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

      <Media at="sm">
        {dismissOnHandle && <Handle closeDialog={onDismiss} {...bind()} />}
      </Media>

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
  Message: typeof Message
  RoundedButton: typeof RoundedButton
  Lazy: typeof Lazy
} = (props) => {
  const { isOpen, onRest, scrollable } = props
  const [mounted, setMounted] = useState(isOpen)
  const initialFocusRef = useRef<any>(null)

  // Drag
  const [{ top }, setDragGoal] = useSpring(() => ({ top: 0 }))

  // Fade In/ Fade Out
  const [{ opacity }, setFade] = useSpring<{
    opacity: number
  }>(() => ({
    opacity: 0,
    config: { tension: 270 },
    onRest: (val: any) => {
      const isFadedOut = _get(val, 'value.opacity') <= 0

      if (isFadedOut) {
        setMounted(false)
        setDragGoal({ top: 0 })
      }

      if (onRest) {
        onRest()
      }
    },
  }))

  useEffect(() => {
    if (isOpen) {
      setMounted(true)
      setFade({ opacity: 1 })
    } else {
      setFade({ opacity: 0 })
    }
  })

  const dialogOverlayClasses = classNames({
    dialog: true,
    [styles.scrollable]: !!scrollable,
    [styles.overlay]: !!mounted,
  })

  const AnimatedDialogOverlay = animated(DialogOverlay)
  const AnimatedContainer = animated(Container)

  if (!mounted) {
    return null
  }

  return (
    <>
      <AnimatedDialogOverlay
        className={dialogOverlayClasses}
        initialFocusRef={initialFocusRef}
        style={{ opacity: opacity as any }}
      >
        <DialogContent aria-labelledby="dialog-title">
          <AnimatedContainer
            style={{ opacity: opacity as any, top }}
            setDragGoal={setDragGoal}
            initialFocusRef={initialFocusRef}
            {...props}
          />
        </DialogContent>
      </AnimatedDialogOverlay>
    </>
  )
}

Dialog.Header = Header
Dialog.Content = Content
Dialog.Message = Message
Dialog.Footer = Footer
Dialog.TextButton = TextButton
Dialog.RoundedButton = RoundedButton
Dialog.Lazy = Lazy
