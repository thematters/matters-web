import { useEffect } from 'react'

import { Toast, ToastProps } from '~/components/Toast'

/**
 * Toast is a component for presenting pop-up message. Don't manually
 * mount component, use event instead.
 *
 * Usage:
 *
 * // To create a toast
 * window.dispatchEvent(new CustomEvent(
 *   'addToast',
 *   { detail:
 *     {
 *       color: 'green',
 *       header: 'header description',
 *       content: 'content description',
 *       closeButton: true,
 *       fixed: false,
 *       duration: 3000
 *     }
 *   }
 * ))
 *
 */

export type FixedToast = {
  id: string
  fixed?: boolean
  duration?: number
} & ToastProps

const FixedToast: React.FC<FixedToast> = ({
  id,
  fixed,
  duration = 3 * 1000,
  ...toastProps
}) => {
  const removeToast = () => {
    window.dispatchEvent(new CustomEvent('removeToast', { detail: { id } }))
  }

  useEffect(() => {
    if (!fixed) {
      setTimeout(removeToast, duration)
    }
  }, [])

  return <Toast {...toastProps} onCloseButtonClick={removeToast} />
}

export default FixedToast
