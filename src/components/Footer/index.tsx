import Link from 'next/link'

import { Translate } from '~/components'

import { PATHS } from '~/common/enums'

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

      <p className="item">© {year} Matters</p>

      <style jsx>{styles}</style>
    </footer>
  )
}
