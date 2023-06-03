import Content from './Content'
import Footer, { FooterProps } from './Footer'
import Header, { HeaderProps } from './Header'
import styles from './styles.module.css'

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

const Field: React.FC<{ children?: React.ReactNode }> & {
  Header: typeof Header
  Footer: typeof Footer
  Content: typeof Content
} = ({ children }) => <section className={styles['field']}>{children}</section>

Field.Header = Header
Field.Footer = Footer
Field.Content = Content

export default Field
