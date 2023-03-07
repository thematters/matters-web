import Link from 'next/link'
import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import { GUIDE_LINKS, PATHS } from '~/common/enums'
import { LanguageContext, LanguageSwitch } from '~/components'

import styles from './styles.css'

const SideFooter = () => {
  const { lang } = useContext(LanguageContext)
  const year = new Date().getFullYear()

  return (
    <footer>
      <section className="buttons">
        <LanguageSwitch />
      </section>

      <section className="links">
        <Link href={PATHS.ABOUT} legacyBehavior>
          <a>
            <FormattedMessage defaultMessage="About Us" description="" />
          </a>
        </Link>

        <Link href={PATHS.GUIDE} legacyBehavior>
          <a>
            <FormattedMessage defaultMessage="Explore Matters" description="" />
          </a>
        </Link>

        <Link href={PATHS.COMMUNITY} legacyBehavior>
          <a>
            <FormattedMessage
              defaultMessage="Matters Community"
              description=""
            />
          </a>
        </Link>

        <Link href={PATHS.MIGRATION} legacyBehavior>
          <a>
            <FormattedMessage
              defaultMessage="Migrate to Matters"
              description=""
            />
          </a>
        </Link>

        <Link href={PATHS.TOS} legacyBehavior>
          <a>
            <FormattedMessage
              defaultMessage="Term of Services"
              description=""
            />
          </a>
        </Link>

        <a
          href="https://github.com/thematters/developer-resource"
          target="_blank"
          rel="noreferrer"
        >
          <FormattedMessage defaultMessage="Open Source" description="" />
        </a>

        <a
          href="https://github.com/thematters/developer-resource/blob/master/SECURITY.md"
          target="_blank"
          rel="noreferrer"
        >
          <FormattedMessage defaultMessage="Bug Bounty" description="" />
        </a>

        <Link href={GUIDE_LINKS.PWA[lang]} legacyBehavior>
          <a>
            <FormattedMessage defaultMessage="Download App" description="" />
          </a>
        </Link>

        <span className="copyright">
          {'@ '}
          <span itemProp="copyrightYear">{year}</span>{' '}
          <span itemProp="copyrightHolder">Matters</span>
        </span>
      </section>

      <style jsx>{styles}</style>
    </footer>
  )
}

export default SideFooter
