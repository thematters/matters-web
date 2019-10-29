import classNames from 'classnames'

import styles from './styles.css'

/**
 * This component is for rendering textarea for <Formik>.
 *
 * Usage:
 *
 * ```jsx
 *   <Form.Textarea
 *     className={[]}
 *     field="description"
 *     placeholder="description"
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
  field: string
  placeholder: string
  hint?: string
  style?: { [key: string]: any }

  values: any
  errors: any
  touched: any
  handleBlur: any
  handleChange: any

  [key: string]: any
}

const Textarea: React.FC<Props> = ({
  className = [],
  field,
  placeholder,
  hint,
  style,

  values,
  errors,
  touched,
  handleBlur,
  handleChange
}) => {
  const textareaClass = classNames('textarea', ...className)
  const value = values[field]
  const error = errors[field]
  const isTouched = touched[field]

  return (
    <>
      <div className="container">
        <textarea
          className={textareaClass}
          name={field}
          placeholder={placeholder}
          onBlur={handleBlur}
          onChange={handleChange}
          value={value}
          style={style}
        />
      </div>

      <div className="info">
        {error && isTouched && <div className="error">{error}</div>}
        {!error && hint && <div className="hint">{hint}</div>}
      </div>

      <style jsx>{styles}</style>
    </>
  )
}

export default Textarea
