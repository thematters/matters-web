import { useState } from 'react'

import { Layout, useEventListener } from '~/components'

import { ADD_TOAST, REMOVE_TOAST } from '~/common/enums'

import { ToastWithEffect } from '../Instance'
import styles from './styles.css'

/**
 * ToastContainer is a place for managing Toast components. Use event system to
 * create and remove Toast components.
 *
 * Usage:
 *
 * ```jsx
 * <ToastContainer layout="" />
 * ```
 */

const prefix = 'toast-'

const Container = () => {
  const [toasts, setToasts] = useState<any[]>([])

  const add = (payload: { [key: string]: any }) => {
    if (!payload || Object.keys(payload).length === 0) {
      return false
    }
    setToasts((prev) => [{ id: `${prefix}${Date.now()}`, ...payload }, ...prev])
  }

  const remove = ({ id }: { id: string }) => {
    if (!id || !id.startsWith(prefix)) {
      return
    }
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  useEventListener(ADD_TOAST, add)
  useEventListener(REMOVE_TOAST, remove)

  return (
    <section className="toast-container">
      <Layout.FixedMain>
        {toasts.map((toast) => (
          <ToastWithEffect key={toast.id} {...toast} />
        ))}
      </Layout.FixedMain>

      <style jsx>{styles}</style>
    </section>
  )
}

export default Container
