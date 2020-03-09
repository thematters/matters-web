import Link from 'next/link'

import { Translate } from '~/components'

import { PATHS } from '~/common/enums'
import { toPath } from '~/common/utils'

import styles from './styles.css'

export const Footer = () => {
  const year = new Date().getFullYear()

  const downloadAppLink = toPath({
    page: 'articleDetail',
    article: {
      slug: 'matters-web-app',
      mediaHash: 'zdpuAugkiUK2uwV2nJPvnJPNE73SM5oaNNX9Z2SdgSmiLTjag',
      author: { userName: 'denkeni' }
    }
  })

  return (
    <footer>
      <Link {...PATHS.MISC_ABOUT}>
        <a>
          <Translate id="about" />
        </a>
      </Link>

      <Link {...PATHS.MISC_FAQ}>
        <a>
          <Translate id="faq" />
        </a>
      </Link>

      <Link {...PATHS.MISC_GUIDE}>
        <a>
          <Translate id="guide" />
        </a>
      </Link>

      <Link {...PATHS.MISC_TOS}>
        <a>
          <Translate id="term" />
        </a>
      </Link>

      <Link {...downloadAppLink}>
        <a>
          <Translate zh_hant="下載應用" zh_hans="下载应用" />
        </a>
      </Link>

      <a
        href="https://github.com/thematters/developer-resource"
        target="_blank"
      >
        <Translate zh_hant="開放社區" zh_hans="开放社区" />
      </a>

      <span className="copyright">
        {'@ '}
        <span itemProp="copyrightYear">{year}</span>{' '}
        <span itemProp="copyrightHolder">Matters</span>
      </span>

      <style jsx>{styles}</style>
    </footer>
  )
}
