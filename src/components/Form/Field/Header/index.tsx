import { VisuallyHidden } from '@reach/visually-hidden'

import styles from './styles.module.css'

export interface HeaderProps {
  label?: string | React.ReactNode
  htmlFor?: string
  extraButton?: React.ReactNode
  labelId?: string
  labelVisHidden?: boolean
}

const Header: React.FC<HeaderProps> = ({
  label,
  htmlFor,
  extraButton,
  labelId,
  labelVisHidden,
}) => {
  if (!label && !extraButton) {
    return null
  }

  const Inner = () => (
    <header>
      <label htmlFor={htmlFor} {...(labelId ? { id: labelId } : {})}>
        {label}
      </label>

      {extraButton}
    </header>
  )

  if (labelVisHidden) {
    return (
      <VisuallyHidden>
        <Inner />
      </VisuallyHidden>
    )
  }

  return <Inner />
}

export default Header
