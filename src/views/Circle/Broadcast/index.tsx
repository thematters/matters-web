import { Layout } from '~/components'

import Profile from '../Profile'
import Broadcast from './Broadcast'
import styles from './styles.css'

const CircleBroadcast = () => (
  <Layout.Main bgColor="grey-lighter">
    <Profile />

    <section className="container">
      <Broadcast />
      <style jsx>{styles}</style>
    </section>
  </Layout.Main>
)

export default CircleBroadcast
