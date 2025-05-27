import { useVisuallyHidden } from 'react-aria'

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
  const { visuallyHiddenProps } = useVisuallyHidden()

  if (!label && !extraButton) {
    return null
  }

  const Inner = () => (
    <header className={styles.header} {...visuallyHiddenProps}>
      <label htmlFor={htmlFor} {...(labelId ? { id: labelId } : {})}>
        {label}
      </label>

      {extraButton}
    </header>
  )

  if (!hasLabel) {
    return <Inner />
  }

  return <Inner />
}

export default Header
