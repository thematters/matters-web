import Alert from '@reach/alert'
import classNames from 'classnames'
import { useEffect } from 'react'

import { REMOVE_TOAST, TOAST_DURATION } from '~/common/enums'
import { sleep } from '~/common/utils'

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
}

export const ToastInstance = ({
  color,
  content,
  subDescription,
  buttonPlacement = 'top',
  customButton,
}: ToastProps) => {
  const mainClasses = classNames({
    toast: true,
    [buttonPlacement]: buttonPlacement,
    [color]: !!color,
    'center-x': !customButton,
  })
  const alertType = color === 'red' ? 'assertive' : 'polite'

  return (
    <section className={mainClasses}>
      <section>
        <Alert type={alertType}>
          {content && <p className="content">{content}</p>}
          {subDescription && (
            <p className="sub-description">{subDescription}</p>
          )}
        </Alert>
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
  const closeAfterDuration = async () => {
    await sleep(duration)
    remove()
  }

  useEffect(() => {
    if (!fixed) {
      closeAfterDuration()
    }
  }, [])

  return <ToastInstance {...toastProps} />
}
