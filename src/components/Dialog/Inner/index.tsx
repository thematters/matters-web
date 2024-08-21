import { VisuallyHidden } from '@reach/visually-hidden'
import { useDrag } from '@use-gesture/react'
import classNames from 'classnames'
import _get from 'lodash/get'
import { useRef, useState } from 'react'

import { KEYVALUE } from '~/common/enums'
import { capitalizeFirstLetter, dom } from '~/common/utils'
import { Media, useNativeEventListener, useOutsideClick } from '~/components'

import Handle from '../Handle'
import styles from './styles.module.css'

export type DialogInnerProps = {
  onDismiss: () => void

  smBgColor?: 'greyLighter'
  smUpBgColor?: 'greyLighter'

  dismissOnClickOutside?: boolean
  dismissOnHandle?: boolean
  dismissOnESC?: boolean

  testId?: string
}

const Inner: React.FC<
  React.PropsWithChildren<
    DialogInnerProps & {
      style?: React.CSSProperties
      initialFocusRef: React.RefObject<any>
    }
  >
> = ({
  onDismiss,

  smBgColor,
  smUpBgColor,

  dismissOnClickOutside = true,
  dismissOnHandle = true,
  dismissOnESC = true,

  style,
  initialFocusRef,
  testId,

  children,
}) => {
  const node: React.RefObject<any> | null = useRef(null)
  const [compositioning, setCompositioning] = useState(false)

  const innerClasses = classNames({
    [styles.inner]: true,
    [smBgColor ? styles[`bg${capitalizeFirstLetter(smBgColor)}`] : '']:
      !!smBgColor,
    [smUpBgColor ? styles[`bg${capitalizeFirstLetter(smUpBgColor)}SmUp`] : '']:
      !!smUpBgColor,
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

  const bind = useDrag(({ down, movement: [, y] }) => {
    if (!down && y > 30) {
      onDismiss()
    } else {
      node.current.style.transform = `translateY(${Math.max(y, 0)}px)`
    }
  })

  const handleClickOutside = (event: MouseEvent) => {
    if (!dismissOnClickOutside) {
      return
    }
    const target = event.target as HTMLElement
    const isOutside = target.hasAttribute('data-reach-dialog-overlay')
    if (!isOutside) {
      return
    }
    closeTopDialog()
  }

  useOutsideClick(node, handleClickOutside)

  const handleKeyboardEvent = (event: KeyboardEvent) => {
    if (event.code?.toLowerCase() !== KEYVALUE.escape) {
      return
    }

    if (!dismissOnESC || compositioning) {
      return
    }

    const poppers = Array.prototype.slice.call(
      dom.$$('[data-tippy-root]')
    ) as Element[]

    const gallery = Array.prototype.slice.call(
      dom.$$('.pswp--open')
    ) as Element[]
    if (poppers.length > 0 || gallery.length > 0) {
      return
    }

    closeTopDialog()
  }

  useNativeEventListener('keyup', (event: KeyboardEvent) => {
    const target = event.target as HTMLElement
    if (
      target.tagName === 'INPUT' ||
      target.tagName === 'TEXTAREA' ||
      target.contentEditable === 'true'
    ) {
      return
    }

    handleKeyboardEvent(event)
  })

  useNativeEventListener('compositionstart', () => {
    setCompositioning(true)
  })

  useNativeEventListener('compositionend', () => {
    setCompositioning(false)
  })

  return (
    <div
      {...(testId ? { 'data-test-id': testId } : {})}
      ref={node}
      className={innerClasses}
      style={style}
      onKeyDown={(event) => {
        const nativeEvent: KeyboardEvent = event.nativeEvent
        handleKeyboardEvent(nativeEvent)
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

export default Inner
