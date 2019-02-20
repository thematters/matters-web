// External modules
import classNames from 'classnames'

// Internal modules
import styles from './styles.css'

const Input = ({
  className = [],
  value,
  handleChange,
  handleBlur,
  error,
  touched,
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
      <div className="feedback">
        {error && touched && <div className="error">{error}</div>}
      </div>
      <style jsx>{styles}</style>
    </>
  )
}

export default Input
