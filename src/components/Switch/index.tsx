import classNames from 'classnames'

import styles from './styles.css'

export const Switch = ({
  onChange,
  checked,
  extraClass
}: {
  onChange: () => void
  checked: boolean
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
      <style jsx>{styles}</style>
    </label>
  )
}
