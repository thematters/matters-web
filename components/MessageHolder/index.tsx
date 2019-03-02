import _filter from 'lodash/filter'
import { useState } from 'react'

import { useEventListener } from '~/components'

import { Message } from './Message'
import styles from './styles.css'

/**
 * MessageHolder is a container for managing Message component. Use event to create
 * and remove a Message component.
 *
 * Usage:
 *
 * ```jsx
 *
 * // Place it on top page.
 * <MessageHolder />
 *
 * ```
 */
const prefix: string = 'message-'

export const MessageHolder = () => {
  const [messages, setMessages] = useState<any[]>([])

  const add = (payload: { [key: string]: any }) => {
    if (!payload || Object.keys(payload).length === 0) {
      return false
    }
    setMessages(prev => [{ id: `${prefix}${Date.now()}`, ...payload }, ...prev])
  }

  const remove = (payload: { id: string }) => {
    const { id } = payload
    if (!id || !id.startsWith(prefix)) {
      return false
    }
    setMessages(prev => _filter(prev, message => message.id !== id))
  }

  useEventListener('addMessage', add)
  useEventListener('removeMessage', remove)

  return (
    <>
      <div className="message-holder">
        <div className="l-row">
          <ul className="l-col-4 l-col-md-6 l-offset-md-1 l-col-lg-8 l-offset-lg-2">
            {messages.map(message => (
              <li key={message.id}>
                <Message {...message} remove={remove} />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <style jsx>{styles}</style>
    </>
  )
}
