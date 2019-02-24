// External modules
import classNames from 'classnames'
import { FC, useEffect, useState } from 'react'

// Internal modules
import styles from './styles.css'

/**
 * Message is a component for presenting pop-up message. Don't manually
 * mount component, use event instead.
 *
 * Usage:
 *
 * // To create a message
 * window.dispatchEvent(new CustomEvent(
 *   'addMessage',
 *   {
 *     content: 'content description',
 *     duration: 3000
 *   }
 * ))
 *
 */
const second = 1000

interface Props {
  id: string
  color: 'white'
  content?: any
  duration: number
  remove: () => void
}

export const Message: FC<Props> = ({
  id,
  color,
  content,
  duration,
  remove
}) => {
  const mainClass = classNames({
    message: true,
    [color]: !!color
  })

  const contentClass = classNames({
    content: true
  })

  const removeMessage = () => {
    window.dispatchEvent(new CustomEvent('removeMessage', { detail: { id } }))
  }

  useEffect(() => {
    setTimeout(removeMessage, duration || 3 * second)
  })

  return (
    <>
      <div className={mainClass}>
        <div>{content && <div className={contentClass}>{content}</div>}</div>
      </div>
      <style jsx>{styles}</style>
    </>
  )
}
