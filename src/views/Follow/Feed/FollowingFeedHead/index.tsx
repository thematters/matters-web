import styles from './styles.module.css'

const FollowingFeedHead: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  return (
    <section className="head">
      <h4>{children}</h4>
    </section>
  )
}

export default FollowingFeedHead
