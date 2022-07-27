import Button from './Button'
import styles from './styles.css'

const Footer: React.FC<React.PropsWithChildren> & { Button: typeof Button } = ({
  children,
}) => (
  <footer>
    {children}

    <style jsx>{styles}</style>
  </footer>
)

Footer.Button = Button

export default Footer
