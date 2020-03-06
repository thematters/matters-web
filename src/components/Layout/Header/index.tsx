import BackButton from './BackButton'
import MeButton from './MeButton'
import styles from './styles.css'
import Title from './Title'

interface HeaderProps {
  left: React.ReactNode
  right?: React.ReactNode
}

const Header: React.FC<HeaderProps> & {
  BackButton: typeof BackButton
  MeButton: typeof MeButton
  Title: typeof Title
} = ({ left, right }) => (
  <header>
    <section className="left">{left}</section>
    <section className="right">{right}</section>

    <style jsx>{styles}</style>
  </header>
)

Header.BackButton = BackButton
Header.MeButton = MeButton
Header.Title = Title

export default Header
