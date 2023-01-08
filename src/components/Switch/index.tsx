import VisuallyHidden from '@reach/visually-hidden'
import classNames from 'classnames'
import { useId } from 'react'

import { IconSpinner16 } from '~/components'

import styles from './styles.css'

type SwitchProps = {
  name: string
  label: string
  onChange: () => void
  checked: boolean
  loading?: boolean
  disabled?: boolean
}

export const Switch: React.FC<SwitchProps> = ({
  name,
  label,
  onChange,
  checked,
  loading,
  disabled,
}) => {
  const fieldId = useId()

  const switchClasses = classNames({
    switch: true,
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
      />

      <span />

      {loading && (
        <span className="loading">
          <IconSpinner16 color="grey-light" />
        </span>
      )}

      <style jsx>{styles}</style>
    </label>
  )
}
