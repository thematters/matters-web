import { Footer } from '~/components'

import Authors from './Authors'
import Icymi from './Icymi'
import styles from './styles.css'
import Tags from './Tags'
import Topics from './Topics'

export default () => (
  <>
    <section>
      <Icymi />
    </section>
    <section>
      <Topics />
    </section>
    <section>
      <Authors />
    </section>
    <section>
      <Tags />
    </section>
    <Footer />
    <style jsx>{styles}</style>
  </>
)
