import Link from 'next/link'
import { useContext } from 'react'

import { LanguageContext, LanguageSwitch, Translate } from '~/components'

import { GUIDE_LINKS, PATHS } from '~/common/enums'

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
            <Translate id="about" />
          </a>
        </Link>

        <Link href={PATHS.GUIDE} legacyBehavior>
          <a>
            <Translate id="guide" />
          </a>
        </Link>

        <Link href={PATHS.COMMUNITY} legacyBehavior>
          <a>
            <Translate id="community" />
          </a>
        </Link>

        <Link href={PATHS.MIGRATION} legacyBehavior>
          <a>
            <Translate id="migrationSideBar" />
          </a>
        </Link>

        <Link href={PATHS.TOS} legacyBehavior>
          <a>
            <Translate id="term" />
          </a>
        </Link>

        <a
          href="https://github.com/thematters/developer-resource"
          target="_blank"
          rel="noopener"
        >
          <Translate id="openCommunity" />
        </a>

        <a
          href="https://github.com/thematters/developer-resource/blob/master/SECURITY.md"
          target="_blank"
          rel="noopener"
        >
          <Translate id="bugBountyProgram" />
        </a>

        <Link href={GUIDE_LINKS.PWA[lang]} legacyBehavior>
          <a>
            <Translate id="downloadApp" />
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
  );
}

export default SideFooter
