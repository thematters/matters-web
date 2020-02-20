import styles from './styles.css'

/**
 * Pure UI component for <input> element
 *
 * Usage:
 *
 * ```jsx
 *   <Form.Textarea
 *     type="email"
 *     error="xxx"
 *     hint="xxx"
 *     ...other input props...
 *   />
 * ```
 *
 */
type TextareaProps = {
  name: string
  label?: string | React.ReactNode

  error?: string | React.ReactNode
  hint?: string | React.ReactNode
} & React.DetailedHTMLProps<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>

const Textarea: React.FC<TextareaProps> = ({
  name,
  label,

  error,
  hint,

  ...textareaProps
}) => {
  return (
    <section className="container">
      <header>
        <label htmlFor={name}>{label}</label>
      </header>

      <textarea {...textareaProps} id={name} name={name} />

      <footer>
        {error && <div className="error">{error}</div>}
        {hint && !error && <div className="hint">{hint}</div>}
      </footer>

      <style jsx>{styles}</style>
    </section>
  )
}

export default Textarea
