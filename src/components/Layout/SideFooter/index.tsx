import Link from 'next/link'
import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import { EXTERNAL_LINKS, GUIDE_LINKS, PATHS } from '~/common/enums'
import { LanguageContext, LanguageSwitch } from '~/components'

import styles from './styles.module.css'

const SideFooter = () => {
  const { lang } = useContext(LanguageContext)
  const year = new Date().getFullYear()

  return (
    <footer>
      <section className={styles.buttons}>
        <LanguageSwitch />
      </section>

      <section className={styles.links}>
        <Link href={PATHS.ABOUT} legacyBehavior>
          <a>
            <FormattedMessage defaultMessage="About Us" />
          </a>
        </Link>

        <Link href={PATHS.GUIDE} legacyBehavior>
          <a>
            <FormattedMessage defaultMessage="Explore Matters" />
          </a>
        </Link>

        <Link href={PATHS.COMMUNITY} legacyBehavior>
          <a>
            <FormattedMessage defaultMessage="Matters Community" />
          </a>
        </Link>

        <Link href={PATHS.MIGRATION} legacyBehavior>
          <a>
            <FormattedMessage defaultMessage="Migrate to Matters" />
          </a>
        </Link>

        <Link href={PATHS.TOS} legacyBehavior>
          <a>
            <FormattedMessage defaultMessage="Term of Services" />
          </a>
        </Link>

        <a
          href={EXTERNAL_LINKS.DEVELOPER_RESOURCE}
          target="_blank"
          rel="noreferrer"
        >
          <FormattedMessage defaultMessage="Open Source" />
        </a>

        <a href={EXTERNAL_LINKS.SECURITY_LINK} target="_blank" rel="noreferrer">
          <FormattedMessage defaultMessage="Bug Bounty" />
        </a>

        <Link href={GUIDE_LINKS.PWA[lang]} legacyBehavior>
          <a>
            <FormattedMessage defaultMessage="Download App" />
          </a>
        </Link>

        <span className={styles.copyright}>
          {'@ '}
          <span itemProp="copyrightYear">{year}</span>{' '}
          <span itemProp="copyrightHolder">Matters</span>
        </span>
      </section>
    </footer>
  )
}

export default SideFooter
