import VisuallyHidden from '@reach/visually-hidden'

import styles from './styles.css'

export interface HeaderProps {
  label?: string | React.ReactNode
  htmlFor?: string
  extraButton?: React.ReactNode
  visHideLabel?: boolean
}

const Header: React.FC<HeaderProps> = ({
  label,
  htmlFor,
  extraButton,
  visHideLabel,
}) => {
  if (!label && !extraButton) {
    return null
  }

  const Inner = () => (
    <header>
      <label htmlFor={htmlFor}>{label}</label>

      {extraButton}

      <style jsx>{styles}</style>
    </header>
  )

  if (visHideLabel) {
    return (
      <VisuallyHidden>
        <Inner />
      </VisuallyHidden>
    )
  }

  return <Inner />
}

export default Header
