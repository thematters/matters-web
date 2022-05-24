import classNames from 'classnames'

import { IconSpinner16 } from '~/components'

// import { randomString } from '~/common/utils'

import styles from './styles.css'

type SwitchProps = {
  onChange: () => void
  checked: boolean
  loading?: boolean
  disabled?: boolean
}

export const Switch: React.FC<SwitchProps> = ({
  onChange,
  checked,
  loading,
  disabled,
}) => {
  // const fieldId = randomString()

  const labelClasses = classNames({
    switch: true,
    'u-area-disable': disabled,
  })

  return (
    <label
      className={labelClasses}
      // htmlFor={fieldId}
    >
      <input
        type="checkbox"
        // id={fieldId}
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
