import { keyframes } from 'goober'
import React from 'react'
import type { Toast as ToastType } from 'react-hot-toast'
import baseToast, { Toaster as BaseToaster } from 'react-hot-toast'
import { useIntl } from 'react-intl'

import {
  Button,
  ButtonProps,
  IconClose22,
  IconWarning22,
  TextIcon,
} from '~/components'

import styles from './styles.module.css'

type ToastActionsProps = {
  type: 'success' | 'error'
  actions: Array<{ content: string | React.ReactNode } & ButtonProps>
  onDismiss?: () => void
  hasClose?: boolean
}

type ToastProps = {
  message: string | React.ReactNode
  hasClose?: boolean
} & Partial<Pick<ToastActionsProps, 'actions'>>

const ToastActions: React.FC<ToastActionsProps> = ({
  type,
  actions,
  onDismiss,
  hasClose = true,
}) => {
  const intl = useIntl()

  return (
    <section className={styles.actions}>
      {actions.map(({ content, onClick, ...props }, index) => (
        <Button
          textColor={type === 'error' ? 'white' : 'whiteLight'}
          onClick={() => {
            onClick && onClick()
            if (hasClose) {
              onDismiss && onDismiss()
            }
          }}
          {...props}
          key={index}
        >
          {content}
        </Button>
      ))}

      {hasClose && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label={intl.formatMessage({
            defaultMessage: 'Close',
            id: 'rbrahO',
          })}
        >
          <IconClose22
            color={type === 'error' ? 'white' : 'whiteLight'}
            size="mdM"
          />
        </button>
      )}
    </section>
  )
}

const enterAnimation = (factor: number) => `
0% {transform: translate3d(0,${factor * -200}%,0); opacity:.5;}
100% {transform: translate3d(0,0,0); opacity:1;}
`

const exitAnimation = (factor: number) => `
0% {transform: translate3d(0,0,-1px); opacity:1;}
100% {transform: translate3d(0,${factor * -150}%,-1px); opacity:0;}
`

const getAnimationStyle = (visible: boolean): React.CSSProperties => {
  const top = true
  const factor = top ? 1 : -1

  const [enter, exit] = [enterAnimation(factor), exitAnimation(factor)]

  return {
    animation: visible
      ? `${keyframes(enter)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`
      : `${keyframes(exit)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`,
  }
}

const Toast: React.FC<
  ToastProps & { type: 'success' | 'error'; toast: ToastType }
> = React.memo(({ message, actions, type, toast, hasClose = true }) => {
  const animationStyle: React.CSSProperties = toast.height
    ? getAnimationStyle(toast.visible)
    : { opacity: 0 }
  const isSuccess = type === 'success'
  const isError = type === 'error'

  return (
    <section
      className={[styles.toast, styles[type]].join(' ')}
      style={{ ...animationStyle }}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      {isSuccess && message}
      {isError && (
        <TextIcon icon={<IconWarning22 color="white" />} spacing="xtight">
          {message}
        </TextIcon>
      )}

      {actions && (
        <ToastActions
          type={type}
          actions={actions}
          onDismiss={() => baseToast.dismiss(toast.id)}
          hasClose={hasClose}
        />
      )}
    </section>
  )
})
Toast.displayName = 'Toast'

export const toast = {
  success: ({ duration, ...props }: ToastProps & { duration?: number }) => {
    return baseToast.custom(
      (toast) => <Toast {...props} toast={toast} type="success" />,
      { duration: !!duration ? duration : props.actions ? 5000 : 3000 }
    )
  },
  error: (props: ToastProps) => {
    return baseToast.custom(
      (toast) => <Toast {...props} toast={toast} type="error" />,
      { duration: props.actions ? 5000 : 3000 }
    )
  },
}

export const Toaster = () => {
  return (
    <BaseToaster
      position="top-center"
      reverseOrder={false}
      gutter={16}
      containerClassName={styles.toastContainer}
    />
  )
}
