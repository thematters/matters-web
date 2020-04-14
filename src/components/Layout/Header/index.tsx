import classNames from 'classnames'

import BackButton from './BackButton'
import CancelButton from './CancelButton'
import MeButton from './MeButton'
import styles from './styles.css'
import Title from './Title'

interface HeaderProps {
  left?: React.ReactNode
  right?: React.ReactNode

  mode?: 'solid-fixed' | 'transparent-absolute'
  spacing?: 0 | 'base' | 'loose'
  className?: string
}

const Header: React.FC<HeaderProps> & {
  BackButton: typeof BackButton
  CancelButton: typeof CancelButton
  MeButton: typeof MeButton
  Title: typeof Title
} = ({ left, right, mode = 'solid-fixed', spacing = 'loose', className }) => {
  const headerClass = classNames({
    [mode]: true,
    [`spacing-${spacing}`]: spacing,
    [`${className}`]: !!className,
  })

  return (
    <header className={headerClass}>
      <section className="content">
        {left && <section className="left">{left}</section>}
        {right && <section className="right">{right}</section>}
      </section>

      <style jsx>{styles}</style>
    </header>
  )
}

Header.BackButton = BackButton
Header.CancelButton = CancelButton
Header.MeButton = MeButton
Header.Title = Title

export default Header
