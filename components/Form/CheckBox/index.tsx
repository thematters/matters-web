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
  style?: { [key: string]: any }

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
  style,

  values,
  errors,
  handleBlur,
  handleChange,
  setFieldValue
}) => {
  const value = values[field]

  const error = errors[field]

  const inputClass = classNames('input', ...className)

  const checkStyle = {
    width: 17,
    marginRight: '0.25rem',
    cursor: 'pointer'
  }

  const checkIcon =
    value === true
      ? ICON_CHECK_ACTIVE
      : error
      ? ICON_CHECK_ERROR
      : ICON_CHECK_INACTIVE

  const click = () => setFieldValue(field, !value, false)

  return (
    <>
      <div className="container">
        <div className="check">
          <Icon
            style={checkStyle}
            id={checkIcon.id}
            viewBox={checkIcon.viewBox}
            onClick={click}
          />
          <input
            className={inputClass}
            type="checkbox"
            name={field}
            value={value}
            style={style}
          />
        </div>
        <div className="description">{children}</div>
      </div>
      <style jsx>{styles}</style>
    </>
  )
}

export default CheckBox
