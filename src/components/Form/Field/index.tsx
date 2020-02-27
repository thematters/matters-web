import Content from './Content'
import Footer, { FooterProps } from './Footer'
import Header, { HeaderProps } from './Header'
import styles from './styles.css'

export type FieldProps = FooterProps & HeaderProps

/**
 * UI component to reuse label, hint, error, etc.
 *
 * Usage:
 *
 * ```jsx
 * <Field>
 *   <Field.Header />
 *   <Field.Content />
 *   <Field.Footer />
 * </Field>
 * ```
 *
 */

const Field: React.FC & {
  Header: typeof Header
  Footer: typeof Footer
  Content: typeof Content
} = ({ children }) => (
  <section className="field">
    {children}

    <style jsx>{styles}</style>
  </section>
)

Field.Header = Header
Field.Footer = Footer
Field.Content = Content

export default Field
