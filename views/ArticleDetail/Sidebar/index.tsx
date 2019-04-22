import { Footer, Responsive } from '~/components'

import Collection from '../Collection'
import styles from './styles.css'

export default () => (
  <Responsive.LargeUp>
    {(match: boolean) => (
      <div className="sticky-container">
        {match && (
          <section className="collection">
            <Collection hasEdit />
          </section>
        )}

        <Footer />
        <style jsx>{styles}</style>
      </div>
    )}
  </Responsive.LargeUp>
)
