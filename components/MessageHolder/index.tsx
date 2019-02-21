// External modules
import classNames from 'classnames'
import _filter from 'lodash/filter'
import { FC, useState } from 'react'

// Internal modules
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
 * <MessageHolder classes={['some', 'classes']} />
 *
 * ```
 */
const prefix: string = 'message-'

interface Props {
  classes?: string[]
}

export const MessageHolder: FC<Props> = ({ classes = [] }) => {
  const [messages, setMessages] = useState<any[]>([])

  const mainClass = classNames(...classes)

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
      <div className="l-row message-holder">
        <div className={mainClass}>
          {messages.map(message => (
            <Message key={message.id} {...message} remove={remove} />
          ))}
        </div>
      </div>
      <style jsx>{styles}</style>
    </>
  )
}
