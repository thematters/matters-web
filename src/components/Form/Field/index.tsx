import classNames from 'classnames'

import { capitalizeFirstLetter } from '~/common/utils'

import Content from './Content'
import Footer, { FooterProps } from './Footer'
import Header, { HeaderProps } from './Header'
import styles from './styles.module.css'

export type FieldProps = FooterProps & HeaderProps & FieldFieledProps

type FieldSpacing = 0 | 'base' | 'loose'

type FieldFieledProps = {
  spacingTop?: FieldSpacing
  spacingBottom?: FieldSpacing
}

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

const Field: React.FC<React.PropsWithChildren<FieldFieledProps>> & {
  Header: typeof Header
  Footer: typeof Footer
  Content: typeof Content
} = ({ spacingTop, spacingBottom, children }) => {
  const classes = classNames({
    [styles[`spacingTop${capitalizeFirstLetter(spacingTop || '')}`]]:
      spacingTop,
    [styles[`spacingBottom${capitalizeFirstLetter(spacingBottom || '')}`]]:
      spacingBottom,
  })

  return <section className={classes}>{children}</section>
}

Field.Header = Header
Field.Footer = Footer
Field.Content = Content

export default Field
