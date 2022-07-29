import styles from './styles.css'

const Content: React.FC<React.PropsWithChildren<React.ReactNode>> = ({
  children,
}) => (
  <section className="input-container">
    {children}

    <style jsx>{styles}</style>
  </section>
)

export default Content
