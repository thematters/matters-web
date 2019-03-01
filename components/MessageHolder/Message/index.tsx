import classNames from 'classnames'
import { useEffect } from 'react'

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
 *     detail: {
 *       type: "error",
 *       content: 'content description',
 *     }
 *   }
 * ))
 *
 */

interface Props {
  id: string
  content: string
  type?: 'success' | 'error' | 'info'
  duration?: number
}

export const Message: React.FC<Props> = ({
  id,
  content,
  type = 'success',
  duration = 3000
}) => {
  const mainClass = classNames({
    message: true,
    [type]: true
  })

  const removeMessage = () => {
    window.dispatchEvent(new CustomEvent('removeMessage', { detail: { id } }))
  }

  useEffect(() => {
    setTimeout(removeMessage, duration)
  })

  if (!content) {
    return null
  }

  return (
    <section className={mainClass}>
      <p>{content}</p>
      <style jsx>{styles}</style>
    </section>
  )
}
