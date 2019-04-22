import { Footer } from '~/components'

import Collection from '../Collection'
import styles from './styles.css'

export default () => (
  <div className="sticky-container">
    <section className="collection">
      <Collection />
    </section>
    <Footer />
    <style jsx>{styles}</style>
  </div>
)
