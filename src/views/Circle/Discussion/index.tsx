import { Layout } from '~/components'

import Profile from '../Profile'
import Discussion from './Discussion'
import styles from './styles.module.css'

const CircleDiscussion = () => (
  <Layout.Main>
    <Profile />

    <section className={styles.container}>
      <Discussion />
    </section>
  </Layout.Main>
)

export default CircleDiscussion
