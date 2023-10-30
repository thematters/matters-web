import { VisuallyHidden } from '@reach/visually-hidden'
import classNames from 'classnames'
import { forwardRef } from 'react'

import { IconSpinner16 } from '~/components'

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
  ({ name, label, onChange, checked, loading, disabled }: SwitchProps, ref) => {
    const fieldId = `switch-${name}`

    const switchClasses = classNames({
      [styles.switch]: true,
      'u-area-disable': disabled,
    })

    return (
      <label htmlFor={fieldId} className={switchClasses}>
        <VisuallyHidden>{label}</VisuallyHidden>

        <input
          type="checkbox"
          id={fieldId}
          onChange={onChange}
          checked={checked}
          disabled={disabled}
          ref={ref as React.RefObject<any>}
        />

        <span />

        {loading && (
          <span className={styles.loading}>
            <IconSpinner16 color="greyLight" />
          </span>
        )}
      </label>
    )
  }
)

Switch.displayName = 'Switch'
