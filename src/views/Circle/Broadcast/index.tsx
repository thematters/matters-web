import { Layout } from '~/components'

import Profile from '../Profile'
import Broadcast from './Broadcast'
import styles from './styles.module.css'

const CircleBroadcast = () => (
  <Layout.Main>
    <Profile />

    <section className={styles.container}>
      <Broadcast />
    </section>
  </Layout.Main>
)

export default CircleBroadcast
