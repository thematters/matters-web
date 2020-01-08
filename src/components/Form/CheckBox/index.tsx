import classNames from 'classnames'

import { Icon } from '~/components'

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
  const click = () => setFieldValue(field, !value)

  return (
    <>
      <div className="container">
        <label className="check" onClick={click}>
          {value === true ? (
            <Icon.CheckActive size="md" />
          ) : error ? (
            <Icon.CheckError size="md" />
          ) : (
            <Icon.CheckInactive size="md" />
          )}
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
