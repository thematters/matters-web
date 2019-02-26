import DesktopNav from './DesktopNav'
import MobileNav from './MobileNav'
import styles from './styles.css'

export default () => (
  <nav>
    <section className="u-sm-up-hide">
      <MobileNav />
    </section>
    <section className="u-sm-down-hide">
      <DesktopNav />
    </section>
    <style jsx>{styles}</style>
  </nav>
)
