import Link from 'next/link'
import { FormattedMessage } from 'react-intl'

import { PATHS } from '~/common/enums'

import styles from './styles.module.css'

const SideFooter = () => {
  return (
    <footer className={styles.footer}>
      <section className={styles.links}>
        <Link href={PATHS.ABOUT}>
          <FormattedMessage defaultMessage="About" id="g5pX+a" />
        </Link>

        <Link href={PATHS.GUIDE}>
          <FormattedMessage defaultMessage="Explore" id="7JlauX" />
        </Link>

        <Link href={PATHS.TOS}>
          <FormattedMessage defaultMessage="Terms" id="xkr+zo" />
        </Link>

        <Link href={PATHS.COMMUNITY}>
          <FormattedMessage defaultMessage="Community" id="4CrCbD" />
        </Link>
      </section>
    </footer>
  )
}

export default SideFooter
