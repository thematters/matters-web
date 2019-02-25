import classNames from 'classnames'
import _filter from 'lodash/filter'
import { FC, useState } from 'react'

import { useEventListener } from '~/components'

import styles from './styles.css'
import { Toast } from './Toast'

/**
 * ToastHolder is a container for managing Toast component. Use event to create
 * and remove a Toast component.
 *
 * Usage:
 *
 * ```jsx
 *
 * // Place it on top page.
 * <ToastHolder classes={['some', 'classes']} />
 *
 * ```
 */
const prefix: string = 'toast-'

interface Props {
  classes?: string[]
}

export const ToastHolder: FC<Props> = ({
  classes = ['l-col-4', 'l-col-md-5', 'l-col-lg-8']
}) => {
  const [toasts, setToasts] = useState<any[]>([])

  const mainClass = classNames(...classes)

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
      <div className="l-row toast-holder">
        <div className={mainClass}>
          {toasts.map(toast => (
            <Toast key={toast.id} {...toast} remove={remove} />
          ))}
        </div>
      </div>
      <style jsx>{styles}</style>
    </>
  )
}
