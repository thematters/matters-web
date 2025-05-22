import { VisuallyHidden } from '@radix-ui/react-visually-hidden'

import styles from './styles.module.css'

export interface HeaderProps {
  label?: string | React.ReactNode
  htmlFor?: string
  labelId?: string
  hasLabel?: boolean
  extraButton?: React.ReactNode
}

const Header: React.FC<HeaderProps> = ({
  label,
  htmlFor,
  labelId,
  hasLabel,
  extraButton,
}) => {
  if (!label && !extraButton) {
    return null
  }

  const Inner = () => (
    <header className={styles.header}>
      <label htmlFor={htmlFor} {...(labelId ? { id: labelId } : {})}>
        {label}
      </label>

      {extraButton}
    </header>
  )

  if (!hasLabel) {
    return (
      <VisuallyHidden>
        <Inner />
      </VisuallyHidden>
    )
  }

  return <Inner />
}

export default Header
