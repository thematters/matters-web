import { DialogContent, DialogOverlay } from '@reach/dialog'
import classNames from 'classnames'
import _get from 'lodash/get'
import { useEffect, useRef, useState } from 'react'
import { animated, useSpring } from 'react-spring'
import { useDrag } from 'react-use-gesture'

import { KEYCODES } from '~/common/enums'
import { dom } from '~/common/utils'
import { Media, useOutsideClick } from '~/components'

import Content from './Content'
import Footer from './Footer'
import Handle from './Handle'
import Header from './Header'
import Lazy from './Lazy'
import Message from './Message'
import Overlay from './Overlay'
import styles from './styles.css'
import globalStyles from './styles.global.css'

export interface DialogOverlayProps {
  isOpen: boolean | undefined
  onDismiss: () => void
  onRest?: () => void
}

export type DialogProps = {
  size?: 'sm' | 'lg'
  smBgColor?: 'grey-lighter'
  smUpBgColor?: 'grey-lighter'
  fixedHeight?: boolean
  hidePaddingBottom?: boolean

  testId?: string
} & DialogOverlayProps

const Container: React.FC<
  React.PropsWithChildren<
    {
      style?: React.CSSProperties
      setDragGoal: (val: any) => void
    } & DialogProps
  >
> = ({
  size = 'lg',
  smBgColor,
  smUpBgColor,
  fixedHeight,
  hidePaddingBottom,
  testId,
  onDismiss,
  children,
  style,
  setDragGoal,
}) => {
  const node: React.RefObject<any> | null = useRef(null)

  const containerClasses = classNames({
    container: true,
    'fixed-height': !!fixedHeight,
    [size]: true,
    [`bg-${smBgColor}`]: !!smBgColor,
    [`bg-${smUpBgColor}-sm-up`]: !!smUpBgColor,
    ['hide-padding-bottom']: !!hidePaddingBottom,
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

  const bind = useDrag(({ down, movement: [, my] }) => {
    if (!down && my > 30) {
      onDismiss()
    } else {
      setDragGoal({ top: down ? Math.max(my, -30) : 0 })
    }
  })

  useOutsideClick(node, closeTopDialog)

  return (
    <div className="l-row" {...(testId ? { 'data-test-id': testId } : {})}>
      <div
        ref={node}
        className={containerClasses}
        style={style}
        onKeyDown={(event) => {
          if (event.keyCode === KEYCODES.escape) {
            closeTopDialog()
          }
        }}
      >
        {children}

        <Media at="sm">
          <Handle closeDialog={onDismiss} {...bind()} />
        </Media>

        <style jsx>{styles}</style>
      </div>
    </div>
  )
}

export const Dialog: React.ComponentType<
  React.PropsWithChildren<DialogProps>
> & {
  Header: typeof Header
  Content: typeof Content
  Footer: typeof Footer
  Message: typeof Message
  Lazy: typeof Lazy
} = (props) => {
  const { isOpen, onRest } = props
  const [mounted, setMounted] = useState(isOpen)

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

  const AnimatedDialogOverlay = animated(DialogOverlay)
  const AnimatedContainer = animated(Container)
  const AnimatedOverlay = animated(Overlay)

  if (!mounted) {
    return null
  }

  return (
    <>
      <AnimatedDialogOverlay className="dialog">
        <AnimatedOverlay style={{ opacity: opacity as any }} />

        <DialogContent
          className="l-container full"
          aria-labelledby="dialog-title"
        >
          <AnimatedContainer
            style={{ opacity: opacity as any, top }}
            setDragGoal={setDragGoal}
            {...props}
          />
        </DialogContent>
      </AnimatedDialogOverlay>

      <style jsx global>
        {globalStyles}
      </style>
    </>
  )
}

Dialog.Header = Header
Dialog.Content = Content
Dialog.Footer = Footer
Dialog.Message = Message
Dialog.Lazy = Lazy
