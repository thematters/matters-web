import { IconSpinner } from '~/components'

import { randomString } from '~/common/utils'

import styles from './styles.css'

export const Switch = ({
  onChange,
  checked,
  loading,
}: {
  onChange: () => void
  checked: boolean
  loading?: boolean
}) => {
  const fieldId = randomString()

  return (
    <label className="switch" htmlFor={fieldId}>
      <input
        type="checkbox"
        id={fieldId}
        onChange={onChange}
        checked={checked}
      />

      <span />

      {loading && (
        <span className="loading">
          <IconSpinner color="grey-light" />
        </span>
      )}

      <style jsx>{styles}</style>
    </label>
  )
}
