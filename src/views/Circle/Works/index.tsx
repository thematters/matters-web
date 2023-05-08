import { Layout } from '~/components'

import Profile from '../Profile'
import styles from './styles.css'
import Works from './Works'

const CircleWorks = () => (
  <Layout.Main>
    <Profile />

    <section className="container">
      <Works />
      <style jsx>{styles}</style>
    </section>
  </Layout.Main>
)

export default CircleWorks
