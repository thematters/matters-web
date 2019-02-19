// External modules
import classNames from 'classnames'
import { useEffect, useState } from 'react'

// Internal modules
import { Icon } from '~/components'
import IconCloseWhite from '~/static/icons/close-white.svg'
import IconClose from '~/static/icons/close.svg'
import styles from './styles.css'

/**
 * Toast is a component for presenting pop-up message. Don't manually
 * mount component, use event instead.
 *
 * Usage:
 *
 * // To create a toast
 * window.dispatchEvent(new CustomEvent(
 *   'addToast',
 *   {
 *     color: 'green',
 *     header: 'header description',
 *     content: 'content description',
 *     closeButton: true,
 *     fixed: false,
 *     duration: 3000
 *   }
 * ))
 *
 */
const second = 1000

interface Props {
  id: string
  color: 'green' | 'grey' | 'red' | 'white'
  header?: any
  content?: any
  closeButton: boolean
  customButton?: any
  fixed: boolean
  duration: number
  remove: () => void
}

export const Toast: React.FC<Props> = ({
  id,
  color,
  header,
  content,
  closeButton,
  customButton,
  fixed,
  duration,
  remove
}) => {
  const mainClass = classNames({
    toast: true,
    [color]: !!color
  })

  const contentClass = classNames({
    content: true,
    opaque: header && content
  })

  const iconCloseSrc = color === 'white' ? IconClose : IconCloseWhite

  const removeToast = () => {
    window.dispatchEvent(new CustomEvent('removeToast', { detail: { id } }))
  }

  useEffect(() => {
    if (fixed !== true) {
      setTimeout(removeToast, duration || 6 * second)
    }
  })

  return (
    <>
      <div className={mainClass}>
        <div>
          {header && <div className="header">{header}</div>}
          {content && <div className={contentClass}>{content}</div>}
        </div>
        {closeButton && (
          <button type="button" onClick={removeToast}>
            <Icon src={iconCloseSrc} />
          </button>
        )}
        {!closeButton && customButton && customButton}
      </div>
      <style jsx>{styles}</style>
    </>
  )
}
