import { FormattedMessage } from 'react-intl'

import { PATHS } from '~/common/enums'
import { LinkWrapper } from '~/components'

import styles from './styles.module.css'

const SideFooter = () => {
  return (
    <footer className={styles.footer}>
      <section className={styles.links}>
        <LinkWrapper href={PATHS.ABOUT}>
          <FormattedMessage defaultMessage="About" id="g5pX+a" />
        </LinkWrapper>

        <LinkWrapper href={PATHS.GUIDE}>
          <FormattedMessage defaultMessage="Explore" id="7JlauX" />
        </LinkWrapper>

        <LinkWrapper href={PATHS.TOS}>
          <FormattedMessage defaultMessage="Terms" id="xkr+zo" />
        </LinkWrapper>

        <LinkWrapper href={PATHS.COMMUNITY}>
          <FormattedMessage defaultMessage="Community" id="4CrCbD" />
        </LinkWrapper>
      </section>
    </footer>
  )
}

export default SideFooter
