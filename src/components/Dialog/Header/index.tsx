import { Button, Icon } from '~/components'

import styles from './styles.css'

interface HeaderProps {
  close: () => void
  rightButton?: React.ReactNode
}

const Header: React.FC<HeaderProps> = ({ close, rightButton, children }) => (
  <header>
    <section className="left">
      <Button onClick={close} aria-label="關閉">
        <Icon.CloseGreenMedium size="lg" />
      </Button>
    </section>

    <h1 id="dialog-title">
      <span>{children}</span>
    </h1>

    {rightButton && <section className="right">{rightButton}</section>}

    <style jsx>{styles}</style>
  </header>
)

export default Header
