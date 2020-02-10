import styles from './styles.css'

const Footer: React.FC = ({ children }) => (
  <footer>
    {children}

    <style jsx>{styles}</style>
  </footer>
)

export default Footer
