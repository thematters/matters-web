import classNames from 'classnames'
import { useEffect } from 'react'

import { REMOVE_TOAST, TOAST_DURATION } from '~/common/enums'

import styles from './styles.css'

/**
 * Toast instance.
 *
 * Usage:
 *
 * ```jsx
 * <ToastInstance color="green" content="content" />
 * ```
 */

interface ToastProps {
  color: 'green' | 'grey' | 'red'
  content?: string | React.ReactNode
  subDescription?: string | React.ReactNode

  buttonPlacement?: 'top' | 'bottom' | 'center'
  customButton?: React.ReactNode
  hasCloseButton?: boolean
  onClose?: () => any
}

export const ToastInstance = ({
  color,
  content,
  subDescription,
  buttonPlacement = 'top',
  customButton,
  onClose
}: ToastProps) => {
  const mainClass = classNames({
    toast: true,
    [buttonPlacement]: buttonPlacement,
    [color]: !!color
  })

  return (
    <section className={mainClass}>
      <section>
        {content && <p className="content">{content}</p>}
        {subDescription && <p className="sub-description">{subDescription}</p>}
      </section>
      {customButton && (
        <section className="custom-button">{customButton}</section>
      )}
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
 *       content: 'some text',
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
