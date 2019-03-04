import classNames from 'classnames'
import { FC } from 'react'

import styles from './styles.css'

/**
 * This component is for rendering text input for <Formik>.
 *
 * Usage:
 *
 * ```jsx
 *   <Input
 *     className={[]}
 *     type="text"
 *     field="email"
 *     placeholder="email"
 *     floatElement={<>}
 *     hint="hint"
 *     style={{}}
 *     values={{}},
 *     errors={{}},
 *     touched={{}},
 *     handleBlur={()=>{}},
 *     handleChange={()=>{}}
 *   />
 * ```
 *
 */

interface Props {
  className?: string[]
  type: 'text' | 'password'
  field: string
  placeholder: string
  floatElement?: any
  hint?: string
  style?: { [key: string]: any }

  values: any
  errors: any
  touched: any
  handleBlur: () => {}
  handleChange: () => {}

  [key: string]: any
}

const Input: FC<Props> = ({
  className = [],
  type,
  field,
  placeholder,
  floatElement,
  hint,
  style,

  values,
  errors,
  touched,
  handleBlur,
  handleChange
}) => {
  const inputClass = classNames('input', ...className)

  const value = values[field]
  const error = errors[field]
  const isTouched = touched[field]

  return (
    <>
      <div className="container">
        <input
          className={inputClass}
          type={type}
          name={field}
          placeholder={placeholder}
          onBlur={handleBlur}
          onChange={handleChange}
          value={value}
          style={style}
        />
        {floatElement && <div className="float-right">{floatElement}</div>}
      </div>
      <div className="info">
        {error && isTouched && <div className="error">{error}</div>}
        {!error && hint && <div className="hint">{hint}</div>}
      </div>
      <style jsx>{styles}</style>
    </>
  )
}

export default Input
