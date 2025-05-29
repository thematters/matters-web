import classNames from 'classnames'
import { forwardRef, useId } from 'react'
import { useVisuallyHidden } from 'react-aria'

import { Spinner } from '~/components'

import styles from './styles.module.css'

export type SwitchProps = {
  name: string
  label: string | React.ReactNode
  onChange?: () => void
  checked: boolean
  loading?: boolean
  disabled?: boolean
}

export const Switch = forwardRef(
  ({ label, onChange, checked, loading, disabled }: SwitchProps, ref) => {
    const fieldId = useId()
    const { visuallyHiddenProps } = useVisuallyHidden()

    const switchClasses = classNames({
      [styles.switch]: true,
      'u-area-disable': disabled,
    })

    return (
      <label htmlFor={fieldId} className={switchClasses}>
        <span {...visuallyHiddenProps}>{label}</span>

        <input
          type="checkbox"
          id={fieldId}
          onChange={onChange}
          checked={checked}
          disabled={disabled}
          ref={ref as React.RefObject<HTMLInputElement>}
        />

        <span />

        {loading && (
          <span className={styles.loading}>
            <Spinner color="greyLight" />
          </span>
        )}
      </label>
    )
  }
)

Switch.displayName = 'Switch'
