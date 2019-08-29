import classNames from 'classnames'
import { FC } from 'react'

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
  handleChange: () => {}
  setFieldValue: (field: string, value: any, validate?: boolean) => {}

  [key: string]: any
}

const CheckBox: FC<Props> = ({
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
        <label className="check">
          <Icon
            id={checkIcon.id}
            viewBox={checkIcon.viewBox}
            size="small"
            onClick={click}
          />
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
