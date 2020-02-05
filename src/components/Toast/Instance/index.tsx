import classNames from 'classnames'
import { useEffect } from 'react'

import { Icon } from '~/components'

import { REMOVE_TOAST, TOAST_DURATION } from '~/common/enums'

import styles from './styles.css'

/**
 * Toast instance.
 *
 * Usage:
 *
 * ```jsx
 * <ToastInstance color="green" header="header" content="content" />
 * ```
 */

interface ToastProps {
  color: 'green' | 'grey' | 'red'
  header?: string | React.ReactNode
  content?: string | React.ReactNode

  buttonPlacement?: 'top' | 'bottom' | 'center'
  customButton?: React.ReactNode
  hasCloseButton?: boolean
  onClose?: () => any
}

export const ToastInstance = ({
  color,
  header,
  content,
  buttonPlacement = 'top',
  customButton,
  hasCloseButton,
  onClose
}: ToastProps) => {
  const mainClass = classNames({
    toast: true,
    [buttonPlacement]: buttonPlacement,
    [color]: !!color
  })
  const iconColor = color === 'green' ? 'green' : 'white'

  return (
    <section className={mainClass}>
      <section>
        {header && <h4 className="header">{header}</h4>}
        {content && <p className="content">{content}</p>}
      </section>
      {hasCloseButton && (
        <button type="button" onClick={onClose}>
          <Icon.Clear size="md" color={iconColor} />
        </button>
      )}
      {!hasCloseButton && customButton && customButton}
      <style jsx>{styles}</style>
    </section>
  )
}

/**
 * ToastWithEffect is a wrapper of toast insatnce. Use event system to
 * mount it.
 *
 * Usage:
 *
 * ```js
 * window.dispatchEvent(new CustomEvent(
 *   'addToast',
 *   {
 *     detail: {
 *       color: 'green',
 *       header: '',
 *       content: 'some text',
 *       hasCloseButton: true,
 *       fixed: false,
 *       duration: 3000
 *     }
 *   }
 * ))
 * ```
 */
export const ToastWithEffect = ({
  id,
  duration = TOAST_DURATION,
  fixed,
  ...toastProps
}: {
  id: string
  duration?: number
  fixed?: boolean
} & ToastProps) => {
  const remove = () => {
    window.dispatchEvent(new CustomEvent(REMOVE_TOAST, { detail: { id } }))
  }

  useEffect(() => {
    if (!fixed) {
      setTimeout(remove, duration)
    }
  }, [])

  return <ToastInstance {...toastProps} onClose={remove} />
}
