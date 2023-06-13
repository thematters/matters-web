import { useState } from 'react'

import { ADD_TOAST, REMOVE_TOAST } from '~/common/enums'
import { Layout, useEventListener } from '~/components'

import { ToastWithEffect } from '../Instance'
import styles from './styles.module.css'

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
const maxToasts = 5 // number of toasts at most to display in the same time

const Container = () => {
  const [toasts, setToasts] = useState<any[]>([])

  const add = (payload: { [key: string]: any }) => {
    if (!payload || Object.keys(payload).length === 0) {
      return false
    }
    setToasts((prev) => [
      { id: `${prefix}${Date.now()}`, ...payload },
      ...prev.slice(0, maxToasts - 1),
    ])
  }

  const remove = ({ id }: { id: string }) => {
    if (!id || !id.startsWith(prefix)) {
      return
    }
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  useEventListener(ADD_TOAST, add)
  useEventListener(REMOVE_TOAST, remove)

  const topToasts: any[] = []
  const bottomToasts: any[] = []
  toasts.forEach((t) => {
    if (t.placement === 'bottom') {
      bottomToasts.push(t)
    } else {
      topToasts.push(t)
    }
  })
  return (
    <section className={styles.toastContainer}>
      <section className={styles.toastTop}>
        <Layout.FixedMain>
          {topToasts.map((toast) => (
            <ToastWithEffect key={toast.id} {...toast} />
          ))}
        </Layout.FixedMain>
      </section>

      <section className={styles.toastBottom}>
        <Layout.FixedMain>
          {bottomToasts.map((toast) => (
            <ToastWithEffect key={toast.id} {...toast} />
          ))}
        </Layout.FixedMain>
      </section>
    </section>
  )
}

export default Container
