import styles from './styles.css'

const FollowHead: React.FC = ({ children }) => {
  return (
    <section className="head">
      <h4>{children}</h4>

      <style jsx>{styles}</style>
    </section>
  )
}

export default FollowHead
