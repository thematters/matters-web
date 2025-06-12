import classNames from 'classnames'
import _get from 'lodash/get'
import { useEffect, useRef, useState } from 'react'
import { animated, useSpring } from 'react-spring'

import {
  BREAKPOINTS,
  BYPASS_FOCUS_LOCK,
  BYPASS_SCROLL_LOCK,
  ENBABLE_FOCUS_LOCK,
  ENBABLE_SCROLL_LOCK,
} from '~/common/enums'
import { useEventListener, useMediaQuery } from '~/components'

import { RoundedButton, TextButton } from './Buttons'
import Content from './Content'
import Footer from './Footer'
import Header from './Header'
import Inner, { DialogInnerProps } from './Inner'
import Lazy from './Lazy'
import styles from './styles.module.css'
import { DialogContent, DialogOverlay } from './vendors'

export type DialogProps = {
  isOpen: boolean | undefined
  onDismiss: () => void

  scrollable?: boolean
  blurred?: boolean
  fixedWidth?: boolean
  testId?: string
} & DialogInnerProps

export type BaseDialogProps = {
  mounted: boolean
  setMounted: (val: boolean) => void
  bypassScrollLock: boolean
  bypassFocusLock: boolean
}

const BaseAnimatedDilaog: React.ComponentType<
  React.PropsWithChildren<DialogProps & BaseDialogProps>
> = ({ fixedWidth = true, ...props }) => {
  const {
    blurred,
    isOpen,
    mounted,
    setMounted,
    scrollable,
    bypassScrollLock,
    bypassFocusLock,
  } = props
  const initialFocusRef = useRef<HTMLButtonElement>(null)

  // Fade In/ Fade Out
  const [{ opacity }, setFade] = useSpring<{
    opacity: number
  }>(() => ({
    opacity: 0,
    config: { tension: 270 },
    onRest: (val: { value: { opacity: number } }) => {
      const isFadedOut = _get(val, 'value.opacity') <= 0

      if (isFadedOut) {
        setMounted(false)
      }
    },
  }))

  useEffect(() => {
    if (isOpen) {
      setFade({ opacity: 1 })
    } else {
      setFade({ opacity: 0 })
    }
  }, [isOpen])

  const dialogOverlayClasses = classNames({
    [styles.dialog]: true,
    [styles.overlay]: !!mounted,
    [styles.scrollable]: !!scrollable,
    [styles.blurred]: !!blurred,
  })

  const containerClasses = classNames({
    [styles.container]: true,
    [styles.fixedWidth]: fixedWidth,
  })

  const AnimatedDialogOverlay = animated(DialogOverlay)
  const AnimatedInner = animated(Inner)

  return (
    <AnimatedDialogOverlay
      className={dialogOverlayClasses}
      initialFocusRef={initialFocusRef}
      style={{ opacity: opacity }}
      dangerouslyBypassScrollLock={bypassScrollLock}
      dangerouslyBypassFocusLock={bypassFocusLock}
    >
      <DialogContent
        className={containerClasses}
        aria-labelledby="dialog-title"
      >
        <AnimatedInner
          style={{ opacity: opacity }}
          initialFocusRef={initialFocusRef}
          {...props}
        />
      </DialogContent>
    </AnimatedDialogOverlay>
  )
}

const BaseSimpleDialog: React.ComponentType<
  React.PropsWithChildren<DialogProps & BaseDialogProps>
> = (props) => {
  const {
    blurred,
    isOpen,
    mounted,
    setMounted,
    bypassScrollLock,
    bypassFocusLock,
    scrollable,
  } = props
  const initialFocusRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (isOpen) {
      return
    }

    setMounted(false)
  }, [isOpen])

  const dialogOverlayClasses = classNames({
    [styles.dialog]: true,
    [styles.overlay]: !!mounted,
    [styles.scrollable]: !!scrollable,
    [styles.blurred]: !!blurred,
  })

  return (
    <DialogOverlay
      className={dialogOverlayClasses}
      initialFocusRef={initialFocusRef}
      dangerouslyBypassScrollLock={bypassScrollLock}
      dangerouslyBypassFocusLock={bypassFocusLock}
    >
      <DialogContent
        className={styles.container}
        aria-labelledby="dialog-title"
      >
        <Inner initialFocusRef={initialFocusRef} {...props} />
      </DialogContent>
    </DialogOverlay>
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
  const { isOpen } = props
  const [mounted, setMounted] = useState(isOpen)
  const [bypassScrollLock, setBypassScrollLock] = useState(false)
  const [bypassFocusLock, setBypassFocusLock] = useState(false)
  const isSmUp = useMediaQuery(`(min-width: ${BREAKPOINTS.MD}px)`)

  useEffect(() => {
    if (isOpen) {
      setMounted(true)
    }
  }, [isOpen])

  useEventListener(BYPASS_SCROLL_LOCK, () => {
    setBypassScrollLock(true)
  })
  useEventListener(ENBABLE_SCROLL_LOCK, () => {
    setBypassScrollLock(false)
  })
  useEventListener(BYPASS_FOCUS_LOCK, () => {
    setBypassFocusLock(true)
  })
  useEventListener(ENBABLE_FOCUS_LOCK, () => {
    setBypassFocusLock(false)
  })

  if (!mounted) {
    return null
  }

  const dialogProps = {
    ...props,
    mounted,
    setMounted,
    bypassScrollLock,
    bypassFocusLock,
  }

  return isSmUp ? (
    <BaseAnimatedDilaog {...dialogProps} />
  ) : (
    <BaseSimpleDialog {...dialogProps} />
  )
}

Dialog.Header = Header
Dialog.Content = Content
Dialog.Footer = Footer
Dialog.TextButton = TextButton
Dialog.RoundedButton = RoundedButton
Dialog.Lazy = Lazy
