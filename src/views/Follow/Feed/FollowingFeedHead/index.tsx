import styles from './styles.css'

const FollowingFeedHead: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <section className="head">
      <h4>{children}</h4>

      <style jsx>{styles}</style>
    </section>
  )
}

export default FollowingFeedHead
