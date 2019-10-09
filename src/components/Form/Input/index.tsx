import classNames from 'classnames'
import { FC } from 'react'

import styles from './styles.css'

/**
 * This component is for rendering text input for <Formik>.
 *
 * Usage:
 *
 * ```jsx
 *   <Form.Input
 *     className={[]}
 *     type="email"
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
  type: 'text' | 'password' | 'email'
  field: string
  placeholder?: string
  floatElement?: any
  hint?: string
  style?: { [key: string]: any }

  values: any
  errors: any
  touched: any
  handleBlur: (event: React.FocusEvent<HTMLInputElement>) => void
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void

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
  handleChange,

  ...restProps
}) => {
  const inputClass = classNames('input', ...className)
  const containerClass = classNames({
    container: true,
    'has-float': floatElement
  })

  const value = values[field]
  const error = errors[field]
  const isTouched = touched[field]

  return (
    <>
      <div className={containerClass}>
        <input
          className={inputClass}
          type={type}
          name={field}
          placeholder={placeholder}
          onBlur={handleBlur}
          onChange={handleChange}
          value={value}
          style={style}
          {...restProps}
        />
        {floatElement && <div className="float-right">{floatElement}</div>}

        <div className="info">
          {error && isTouched && <div className="error">{error}</div>}
          {/* {error && <div className="error">{error}</div>} */}
          {(!error || !isTouched) && hint && <div className="hint">{hint}</div>}
        </div>
      </div>
      <style jsx>{styles}</style>
    </>
  )
}

export default Input
