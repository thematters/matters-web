import Link from 'next/link'

import { Translate } from '~/components'

import { PATHS, TEXT } from '~/common/enums'

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
        text={
          <Translate
            zh_hant={TEXT.zh_hant.about}
            zh_hans={TEXT.zh_hans.about}
          />
        }
      />

      <BaseLink
        href={PATHS.MISC_FAQ.href}
        as={PATHS.MISC_FAQ.as}
        text={
          <Translate zh_hant={TEXT.zh_hant.faq} zh_hans={TEXT.zh_hans.faq} />
        }
      />

      <BaseLink
        href={PATHS.MISC_GUIDE.href}
        as={PATHS.MISC_GUIDE.as}
        text={
          <Translate
            zh_hant={TEXT.zh_hant.guide}
            zh_hans={TEXT.zh_hans.guide}
          />
        }
      />

      <BaseLink
        href={PATHS.MISC_TOS.href}
        as={PATHS.MISC_TOS.as}
        text={
          <Translate zh_hant={TEXT.zh_hant.term} zh_hans={TEXT.zh_hans.term} />
        }
      />

      <p className="item">© {year} Matters</p>

      <style jsx>{styles}</style>
    </footer>
  )
}
