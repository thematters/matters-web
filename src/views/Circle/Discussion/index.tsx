import { Layout } from '~/components'

import Profile from '../Profile'
import Discussion from './Discussion'
import styles from './styles.css'

const CircleDiscussion = () => (
  <Layout.Main smBgColor="grey-lighter">
    <Profile />

    <section className="container">
      <Discussion />
      <style jsx>{styles}</style>
    </section>
  </Layout.Main>
)

export default CircleDiscussion
