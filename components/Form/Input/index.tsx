import classNames from 'classnames'

import styles from './styles.css'

/**
 * This component is for rendering text input for <Formik>.
 *
 * Usage:
 *
 * ```jsx
 *   <Form.Input
 *     type="text"
 *     name="text"
 *     placeholder="text"
 *     className={[]}
 *     onChange={handleChange}
 *     onBlur={handleBlur}
 *     onChange={onChange}
 *     value={value}
 *     error={error}
 *     touched={touched}
 *     hint={hint}
 *   />
 * ```
 *
 */

const Input = ({
  className = [],
  value,
  handleChange,
  handleBlur,
  error,
  touched,
  hint,
  ...props
}) => {
  const inputClass = classNames('input', ...className)

  return (
    <>
      <input
        className={inputClass}
        onChange={handleChange}
        onBlur={handleBlur}
        value={value}
        {...props}
      />
      <div className="info">
        {error && touched && <div className="error">{error}</div>}
        {!error && hint && <div className="hint">{hint}</div>}
      </div>
      <style jsx>{styles}</style>
    </>
  )
}

export default Input
