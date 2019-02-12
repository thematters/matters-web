// External modules
import classNames from 'classnames'
import { useState, useEffect } from 'react'

// Internal modules
import { emitter } from '~/common/services/event'
import { Icon } from '~/components'
import IconClose from '~/static/icons/close.svg'
import IconCloseWhite from '~/static/icons/close-white.svg'
import styles from './styles.css'

const second = 1000

type Props = {
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

export const Toast: React.SFC<Props> = ({
  id, color, header, content, closeButton, button, fixed, duration, remove
}) => {

  const mainClass = classNames({
    'toast': true,
    [color]: !!color
  })

  const contentClass = classNames({
    'content': true,
    'opaque': header && content
  })

  const iconCloseSrc = color === 'white' ? IconClose : IconCloseWhite

  const iconCloseStyle = { cursor: 'pointer' }

  useEffect(() => {
    if (fixed !== true) {
      setTimeout(() => {
        emitter.emit('removeToast', { id })
      }, duration || 5 * second)
    }
  })

  return (
    <>
      <div className={mainClass}>
        <div>
          { header && <div className="header">{header}{id}</div> }
          { content && <div className={contentClass}>{content}</div> }
        </div>
        {
          closeButton &&
            <Icon
              src={iconCloseSrc}
              style={iconCloseStyle}
              onClick={() => {emitter.emit('removeToast', { id })}}
            />
        }
        { !closeButton && customButton && customButton }
      </div>
      <style jsx>{styles}</style>
    </>
  )
}
