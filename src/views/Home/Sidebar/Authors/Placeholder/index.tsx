import { List } from '~/components'
import { UserDigest } from '~/components/UserDigest'

import styles from '../styles.module.css'
import placeholderStyles from './styles.module.css'

const Placeholder = () => {
  return (
    <section className={styles.container}>
      <section className={placeholderStyles.header}>
        <section className={placeholderStyles.left} />
        <section className={placeholderStyles.right} />
      </section>

      <List hasBorder={false} spacing={['base', 0]}>
        <List.Item>
          <UserDigest.Rich.Placeholder />
        </List.Item>
        <List.Item>
          <UserDigest.Rich.Placeholder />
        </List.Item>
        <List.Item>
          <UserDigest.Rich.Placeholder />
        </List.Item>
        <List.Item>
          <UserDigest.Rich.Placeholder />
        </List.Item>
      </List>
    </section>
  )
}

export default Placeholder
