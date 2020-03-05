import { Head, Layout, Term } from '~/components'

import MiscTab from '../MiscTab'
import styles from '../styles.css'

export default () => (
  <Layout>
    <Head title={{ id: 'termAndPrivacy' }} />

    <section className="misc">
      <MiscTab />
      <Term />

      <style jsx>{styles}</style>
    </section>
  </Layout>
)
