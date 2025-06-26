import { UserDigest } from '~/components/UserDigest'

import styles from './styles.module.css'

const Placeholder = () => {
  return (
    <section className={styles.placeholder}>
      <UserDigest.Rich.Placeholder />
      <UserDigest.Rich.Placeholder />
      <UserDigest.Rich.Placeholder />
      <UserDigest.Rich.Placeholder />
    </section>
  )
}

export default Placeholder
