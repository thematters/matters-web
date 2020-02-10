import styles from './styles.css'

const Content: React.FC = ({ children }) => (
  <section className="content">
    {children}

    <style jsx>{styles}</style>
  </section>
)

export default Content
