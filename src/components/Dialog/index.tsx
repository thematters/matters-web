import { DialogContent, DialogOverlay } from '@reach/dialog'
import { VisuallyHidden } from '@reach/visually-hidden'
import classNames from 'classnames'
import _get from 'lodash/get'
import { useContext, useEffect, useRef, useState } from 'react'
import { animated, useSpring } from 'react-spring'
import { useDrag } from 'react-use-gesture'

import { KEYVALUE } from '~/common/enums'
import { capitalizeFirstLetter, dom, translate } from '~/common/utils'
import { LanguageContext, Media, useOutsideClick } from '~/components'

import { RoundedButton, TextButton } from './Buttons'
import Content from './Content'
import Footer from './Footer'
import Handle from './Handle'
import Header from './Header'
import Lazy from './Lazy'
import Message from './Message'
import Overlay from './Overlay'
import styles from './styles.module.css'

export interface DialogOverlayProps {
  isOpen: boolean | undefined
  onDismiss: () => void
  onRest?: () => void
}

export type DialogProps = {
  smBgColor?: 'greyLighter'
  smUpBgColor?: 'greyLighter'
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
  smBgColor,
  smUpBgColor,
  hidePaddingBottom,
  testId,
  onDismiss,
  children,
  style,
  setDragGoal,
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

  const bind = useDrag(({ down, movement: [, my] }) => {
    if (!down && my > 30) {
      onDismiss()
    } else {
      setDragGoal({ top: down ? Math.max(my, -30) : 0 })
    }
  })

  useOutsideClick(node, closeTopDialog)

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
        closeTopDialog()
      }}
    >
      {children}

      <Media at="sm">
        <Handle closeDialog={onDismiss} {...bind()} />
      </Media>
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
  TextButton: typeof TextButton
  RoundedButton: typeof RoundedButton
  Lazy: typeof Lazy
} = (props) => {
  const { lang } = useContext(LanguageContext)
  const { isOpen, onRest } = props
  const [mounted, setMounted] = useState(isOpen)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

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
      <AnimatedDialogOverlay
        className="dialog"
        initialFocusRef={closeButtonRef}
      >
        <AnimatedOverlay style={{ opacity: opacity as any }} />

        <VisuallyHidden>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={props.onDismiss}
            aria-label={translate({ id: 'close', lang })}
          />
        </VisuallyHidden>

        <DialogContent aria-labelledby="dialog-title">
          <AnimatedContainer
            style={{ opacity: opacity as any, top }}
            setDragGoal={setDragGoal}
            {...props}
          />
        </DialogContent>
      </AnimatedDialogOverlay>
    </>
  )
}

Dialog.Header = Header
Dialog.Content = Content
Dialog.Footer = Footer
Dialog.Message = Message
Dialog.TextButton = TextButton
Dialog.RoundedButton = RoundedButton
Dialog.Lazy = Lazy
