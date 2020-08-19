import Button from './Button'
import styles from './styles.css'

interface FooterProps {
  // force button to show as a block even on sm-up
  block?: boolean
}

const Footer: React.FC<FooterProps> & { Button: typeof Button } = ({
  block,
  children,
}) => (
  <footer className={block ? 'block' : ''}>
    {children}

    <style jsx>{styles}</style>
  </footer>
)

Footer.Button = Button

export default Footer
