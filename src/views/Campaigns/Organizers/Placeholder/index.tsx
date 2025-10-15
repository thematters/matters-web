import { List } from '~/components'
import { UserDigest } from '~/components/UserDigest'

import styles from './styles.module.css'

const Placeholder = () => {
  return (
    <section className={styles.container}>
      <section className={styles.header}>
        <div className={styles.left} />
      </section>

      <List hasBorder={false} spacing={['base', 0]}>
        {Array.from({ length: 4 }, (_, i) => (
          <List.Item key={i}>
            <UserDigest.Rich.Placeholder />
          </List.Item>
        ))}
      </List>
    </section>
  )
}

export default Placeholder
