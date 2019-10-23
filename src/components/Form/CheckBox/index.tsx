import classNames from 'classnames'

import { Icon } from '~/components/Icon'

import ICON_CHECK_ACTIVE from '~/static/icons/checkbox-check-active.svg?sprite'
import ICON_CHECK_ERROR from '~/static/icons/checkbox-check-error.svg?sprite'
import ICON_CHECK_INACTIVE from '~/static/icons/checkbox-check-inactive.svg?sprite'

import styles from './styles.css'

interface Props {
  children?: any
  className?: string[]
  field: string

  values: any
  errors: any
  handleBlur?: () => {}
  handleChange(e: React.ChangeEvent<any>): void
  setFieldValue(field: string, value: any): void

  [key: string]: any
}

const CheckBox: React.FC<Props> = ({
  children,
  className = [],
  field,

  values,
  errors,
  handleBlur,
  handleChange,
  setFieldValue
}) => {
  const value = values[field]

  const error = errors[field]

  const inputClass = classNames('input', ...className)

  const checkIcon =
    value === true
      ? ICON_CHECK_ACTIVE
      : error
      ? ICON_CHECK_ERROR
      : ICON_CHECK_INACTIVE

  const click = () => setFieldValue(field, !value)

  return (
    <>
      <div className="container">
        <label className="check" onClick={click}>
          <Icon id={checkIcon.id} viewBox={checkIcon.viewBox} size="small" />
          <input
            className={inputClass}
            type="checkbox"
            name={field}
            value={value}
          />
        </label>
        <div className="description">{children}</div>
      </div>

      <style jsx>{styles}</style>
    </>
  )
}

export default CheckBox
