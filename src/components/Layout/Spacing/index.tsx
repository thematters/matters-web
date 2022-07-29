import styles from './styles.css'

const Spacing: React.FC<React.PropsWithChildren<React.ReactNode>> = ({
  children,
}) => (
  <section>
    {children}

    <style jsx>{styles}</style>
  </section>
)

export default Spacing
