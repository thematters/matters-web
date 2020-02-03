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
    <label className="switch">
      <input type="checkbox" onChange={onChange} checked={checked} />

      <span />

      {loading && (
        <span className="loading">
          <Icon.Spinner />
        </span>
      )}

      <style jsx>{styles}</style>
    </label>
  )
}
