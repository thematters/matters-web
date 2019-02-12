// External modules
import classNames from 'classnames'
import { filter } from 'lodash'
import { useState, useEffect } from 'react'

// Internal modules
import { emitter } from '~/common/services/event'
import { Toast } from './Toast'
import styles from './styles.css'

const prefix: string = 'toast-'

type Props = {
  classes?: string[]
}

export const ToastHolder: React.FC<Props> = ({
  classes = ['l-col-4', 'l-col-md-5', 'l-col-lg-8']
}) => {

  const [toasts, setToasts] = useState<any[]>([])

  const mainClass = classNames(...classes)

  const add = (payload: {[key: string]: any}) => {
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
    setToasts(prev => filter(prev, toast => toast.id !== id))
  }

  useEffect(() => {
    emitter.on('addToast', add)
    emitter.on('removeToast', remove)
    return () => {
      emitter.off('addToast', add)
      emitter.off('removeToast', remove)
    }
  }, [toasts])

  return (
    <>
      <div className="l-row toast-holder">
        <div className={mainClass}>
          {
            toasts.map(
              toast => <Toast key={toast.id} {...toast} remove={remove} />
            )
          }
        </div>
      </div>
      <style jsx>{styles}</style>
    </>
  )
}
