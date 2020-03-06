import classNames from 'classnames'

import BackButton from './BackButton'
import MeButton from './MeButton'
import styles from './styles.css'
import Title from './Title'

interface HeaderProps {
  left: React.ReactNode
  right?: React.ReactNode

  mode?: 'solid-fixed' | 'transparent-absolute'
  marginBottom?: 0 | 'base' | 'loose'
  className?: string
}

const Header: React.FC<HeaderProps> & {
  BackButton: typeof BackButton
  MeButton: typeof MeButton
  Title: typeof Title
} = ({
  left,
  right,
  mode = 'solid-fixed',
  marginBottom = 'loose',
  className
}) => {
  const headerClass = classNames({
    [mode]: true,
    [`margin-${marginBottom}`]: marginBottom,
    [`${className}`]: !!className
  })

  return (
    <header className={headerClass}>
      <section className="content">
        <section className="left">{left}</section>
        <section className="right">{right}</section>
      </section>

      <style jsx>{styles}</style>
    </header>
  )
}

Header.BackButton = BackButton
Header.MeButton = MeButton
Header.Title = Title

export default Header
