import styles from './styles.css'

interface ContentProps {
  spacing?: 'none' | 'small' | 'default'
}

const Content: React.FC<ContentProps> = ({ children, spacing = 'default' }) => (
  <section className={spacing}>
    {children}
    <style jsx>{styles}</style>
  </section>
)

export default Content
