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
  const inputClass = classNames('input', ...className)

  return (
    <>
      <div className="container">
        <label className="check" htmlFor="checkbox-input">
          {value === true ? (
            <Icon.CheckActive size="sm" />
          ) : (
            <Icon.CheckInactive size="sm" />
          )}

          <input
            className={inputClass}
            type="checkbox"
            id="upload-input"
            name={field}
            onChange={e => setFieldValue(field, e.target.checked)}
            {...(value ? { checked: true } : {})}
          />
        </label>

        <div className="description">{children}</div>
      </div>

      <style jsx>{styles}</style>
    </>
  )
}

export default CheckBox
