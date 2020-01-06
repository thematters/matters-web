import classNames from 'classnames'

import { Icon } from '~/components'

import styles from './styles.css'

export const Switch = ({
  onChange,
  checked,
  loading,
  extraClass
}: {
  onChange: () => void
  checked: boolean
  loading?: boolean
  extraClass?: 'narrow'
}) => {
  const switchClassNames = classNames({
    switch: true,
    ...(extraClass ? { [extraClass]: !!extraClass } : {})
  })
  return (
    <label className={switchClassNames}>
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
