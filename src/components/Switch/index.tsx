import { Icon } from '~/components'

import styles from './styles.css'

export const Switch = ({
  onChange,
  checked,
  loading
}: {
  onChange: () => void
  checked: boolean
  loading?: boolean
}) => {
  return (
    <label className="switch" htmlFor="switch-checkbox">
      <input
        type="checkbox"
        id="switch-checkbox"
        onChange={onChange}
        checked={checked}
      />

      <span />

      {loading && (
        <span className="loading">
          <Icon.Spinner color="grey-light" />
        </span>
      )}

      <style jsx>{styles}</style>
    </label>
  )
}
