import Link from 'next/link'

import { Translate } from '~/components'

import { PATHS } from '~/common/enums'
import { toPath } from '~/common/utils'

import styles from './styles.css'

const SideFooter = () => {
  const year = new Date().getFullYear()

  const downloadAppLink = toPath({
    page: 'articleDetail',
    article: {
      slug: 'guidance-如何让你的matters之旅更便捷',
      mediaHash: 'bafyreiayiuxi4qc2a7qpgjp3fe42wmaoppqykckcvtq4hiukl5pgs3dn2m',
      author: { userName: '1ampa55ag3' },
    },
  })

  return (
    <footer>
      <Link href={PATHS.ABOUT}>
        <a>
          <Translate id="about" />
        </a>
      </Link>

      <Link href={PATHS.GUIDE}>
        <a>
          <Translate id="guide" />
        </a>
      </Link>

      <Link href={PATHS.COMMUNITY}>
        <a>
          <Translate id="community" />
        </a>
      </Link>

      <Link href={PATHS.MIGRATION}>
        <a>
          <Translate id="migrationSideBar" />
        </a>
      </Link>

      <Link href={PATHS.TOS}>
        <a>
          <Translate id="term" />
        </a>
      </Link>

      <a
        href="https://github.com/thematters/developer-resource"
        target="_blank"
      >
        <Translate id="openCommunity" />
      </a>

      <Link {...downloadAppLink}>
        <a>
          <Translate id="downloadApp" />
        </a>
      </Link>

      <span className="copyright">
        {'@ '}
        <span itemProp="copyrightYear">{year}</span>{' '}
        <span itemProp="copyrightHolder">Matters</span>
      </span>

      <style jsx>{styles}</style>
    </footer>
  )
}

export default SideFooter
