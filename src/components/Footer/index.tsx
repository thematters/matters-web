import Link from 'next/link'

import { Translate } from '~/components'

import { PATHS } from '~/common/enums'
import { toPath } from '~/common/utils'

import styles from './styles.css'

const BaseLink = ({
  href,
  as,
  text
}: {
  href: string
  as: string
  text: React.ReactNode
}) => (
  <Link href={href} as={as}>
    <a className="item">
      {text}

      <style jsx>{styles}</style>
    </a>
  </Link>
)

export const Footer = () => {
  const year = new Date().getFullYear()

  const { href: appHref, as: appAs } = toPath({
    page: 'articleDetail',
    article: {
      slug: 'matters-web-app',
      mediaHash: 'zdpuAugkiUK2uwV2nJPvnJPNE73SM5oaNNX9Z2SdgSmiLTjag',
      author: { userName: 'denkeni' }
    }
  })

  return (
    <footer className="footer">
      <BaseLink
        href={PATHS.MISC_ABOUT.href}
        as={PATHS.MISC_ABOUT.as}
        text={<Translate id="about" />}
      />

      <BaseLink
        href={PATHS.MISC_FAQ.href}
        as={PATHS.MISC_FAQ.as}
        text={<Translate id="faq" />}
      />

      <BaseLink
        href={PATHS.MISC_GUIDE.href}
        as={PATHS.MISC_GUIDE.as}
        text={<Translate id="guide" />}
      />

      <BaseLink
        href={PATHS.MISC_TOS.href}
        as={PATHS.MISC_TOS.as}
        text={<Translate id="term" />}
      />

      <BaseLink
        href={appHref}
        as={appAs}
        text={<Translate zh_hant="下載應用" zh_hans="下载应用" />}
      />

      <BaseLink
        href={'https://github.com/thematters/developer-resource'}
        as={'https://github.com/thematters/developer-resource'}
        text={<Translate zh_hant={'開放社區'} zh_hans={'开放社区'} />}
      />

      <p className="item">© {year} Matters</p>

      <style jsx>{styles}</style>
    </footer>
  )
}
