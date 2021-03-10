import styles from './styles.css'

const Label: React.FC = ({ children }) => (
  <span className="label">
    {children}

    <style jsx>{styles}</style>
  </span>
)

export default Label
