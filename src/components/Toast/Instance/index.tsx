import Alert from '@reach/alert'
import classNames from 'classnames'
import { useEffect } from 'react'

import { Button, IconClear16 } from '~/components'

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

export interface ToastInstanceProps {
  color: 'green' | 'grey' | 'red' | 'black'
  content?: string | React.ReactNode
  subDescription?: string | React.ReactNode
  clearable?: boolean

  buttonPlacement?: 'top' | 'bottom' | 'center' | 'center-all'
  customButton?: React.ReactNode
  switchContent?: React.ReactNode
  onClick?: (event?: React.MouseEvent<HTMLElement, MouseEvent>) => any
}

export const ToastInstance = ({
  color,
  content,
  subDescription,
  clearable = false,
  buttonPlacement = 'top',
  customButton,
  switchContent,
  onClick,
  ...restProps
}: ToastInstanceProps) => {
  const mainClasses = classNames({
    toast: true,
    [buttonPlacement]: buttonPlacement,
    [color]: !!color,
    'center-x': !customButton,
  })
  const alertType = color === 'red' ? 'assertive' : 'polite'

  return (
    <section>
      {clearable && (
        <div className="clearButton">
          <Button size={['2rem', '2rem']} onClick={onClick}>
            <IconClear16 size="lg" />
          </Button>
        </div>
      )}
      <section className={mainClasses} {...restProps}>
        <section>
          <Alert type={alertType}>
            {content && (
              <p className="content">
                {content}
                {switchContent && (
                  <span onClick={onClick}>{switchContent}</span>
                )}
              </p>
            )}
            {subDescription && (
              <p className="sub-description">{subDescription}</p>
            )}
          </Alert>
        </section>

        {customButton && (
          <section className="custom-button">{customButton}</section>
        )}
      </section>
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
  placement = 'top',
  ...toastProps
}: {
  id: string
  duration?: number
  fixed?: boolean
  placement?: 'top' | 'bottom'
} & ToastInstanceProps) => {
  const remove = () => {
    window.dispatchEvent(new CustomEvent(REMOVE_TOAST, { detail: { id } }))
  }
  const closeAfterDuration = async () => {
    await sleep(duration)
    remove()
  }

  const onClick = (event?: React.MouseEvent<HTMLElement, MouseEvent>) => {
    remove()
  }

  toastProps.onClick = onClick

  useEffect(() => {
    if (!fixed) {
      closeAfterDuration()
    }
  }, [])

  return <ToastInstance {...toastProps} />
}
