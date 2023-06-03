import { Layout } from '~/components'

import Profile from '../Profile'
import styles from './styles.module.css'
import Works from './Works'

const CircleWorks = () => (
  <Layout.Main>
    <Profile />

    <section className="container">
      <Works />
    </section>
  </Layout.Main>
)

export default CircleWorks
