import styles from './styles.css'

/**
 * Pure UI component for <input> element
 *
 * Usage:
 *
 * ```jsx
 *   <Form.Input
 *     type="email"
 *     error="xxx"
 *     hint="xxx"
 *     ...other input props...
 *   />
 * ```
 *
 */

type InputProps = {
  type: 'text' | 'password' | 'email'
  name: string
  label?: string | React.ReactNode

  error?: string | React.ReactNode
  hint?: string | React.ReactNode

  extraButton?: React.ReactNode
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

const Input: React.FC<InputProps> = ({
  type,
  name,
  label,

  error,
  hint,

  extraButton,

  ...inputProps
}) => {
  return (
    <section className="container">
      <header>
        <label htmlFor={name}>{label}</label>

        {extraButton}
      </header>

      <input {...inputProps} id={name} name={name} type={type} />

      <footer>
        {error && !hint && <div className="error">{error}</div>}
        {hint && !error && <div className="hint">{hint}</div>}
      </footer>

      <style jsx>{styles}</style>
    </section>
  )
}

export default Input
