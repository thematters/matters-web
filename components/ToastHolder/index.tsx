import _filter from 'lodash/filter'
import { FC, useState } from 'react'

import { useEventListener } from '~/components'

import FixedToast from './FixedToast'
import styles from './styles.css'

/**
 * ToastHolder is a container for managing Toast component. Use event to create
 * and remove a Toast component.
 *
 * Usage:
 *
 * ```jsx
 *
 * // Place it on top page.
 * <ToastHolder  />
 *
 * ```
 */
const prefix: string = 'toast-'

interface Props {
  layoutClasses?: string
}

export const ToastHolder: FC<Props> = ({
  layoutClasses = 'l-col-4 l-col-md-5 l-col-lg-8'
}) => {
  const [toasts, setToasts] = useState<any[]>([])

  const add = (payload: { [key: string]: any }) => {
    if (!payload || Object.keys(payload).length === 0) {
      return false
    }
    setToasts(prev => [{ id: `${prefix}${Date.now()}`, ...payload }, ...prev])
  }

  const remove = (payload: { id: string }) => {
    const { id } = payload
    if (!id || !id.startsWith(prefix)) {
      return false
    }
    setToasts(prev => _filter(prev, toast => toast.id !== id))
  }

  useEventListener('addToast', add)
  useEventListener('removeToast', remove)

  return (
    <>
      <div className="toast-holder">
        <div className="l-row">
          <div className={layoutClasses}>
            {toasts.map(toast => (
              <FixedToast key={toast.id} {...toast} />
            ))}
          </div>
        </div>
      </div>
      <style jsx>{styles}</style>
    </>
  )
}
