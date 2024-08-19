import { VisuallyHidden } from '@reach/visually-hidden'
import { useDrag } from '@use-gesture/react'
import classNames from 'classnames'
import _get from 'lodash/get'
import { useRef } from 'react'

import { KEYVALUE } from '~/common/enums'
import { capitalizeFirstLetter, dom } from '~/common/utils'
import { Media, useOutsideClick } from '~/components'

import Handle from '../Handle'
import styles from './styles.module.css'

export type DialogInnerProps = {
  onDismiss: () => void

  smBgColor?: 'greyLighter'
  smUpBgColor?: 'greyLighter'

  dismissOnClickOutside?: boolean
  dismissOnHandle?: boolean

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

  dismissOnClickOutside = false,
  dismissOnHandle = true,

  style,
  initialFocusRef,
  testId,

  children,
}) => {
  const node: React.RefObject<any> | null = useRef(null)

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
      className={innerClasses}
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

export default Inner
