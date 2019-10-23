import Link from 'next/link'
import { useContext } from 'react'

import { LanguageContext } from '~/components'

import { PATHS, TEXT } from '~/common/enums'
import { translate } from '~/common/utils'

import styles from './styles.css'

const BaseLink = ({
  href,
  as,
  text
}: {
  href: string
  as: string
  text: string
}) => (
  <>
    <Link href={href} as={as}>
      <a className="item">{text}</a>
    </Link>

    <style jsx>{styles}</style>
  </>
)

export const Footer = () => {
  const { lang } = useContext(LanguageContext)
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <BaseLink
        href={PATHS.MISC_ABOUT.href}
        as={PATHS.MISC_ABOUT.as}
        text={translate({
          zh_hant: TEXT.zh_hant.about,
          zh_hans: TEXT.zh_hans.about,
          lang
        })}
      />

      <BaseLink
        href={PATHS.MISC_FAQ.href}
        as={PATHS.MISC_FAQ.as}
        text={translate({
          zh_hant: TEXT.zh_hant.faq,
          zh_hans: TEXT.zh_hans.faq,
          lang
        })}
      />

      <BaseLink
        href={PATHS.MISC_GUIDE.href}
        as={PATHS.MISC_GUIDE.as}
        text={translate({
          zh_hant: TEXT.zh_hant.guide,
          zh_hans: TEXT.zh_hans.guide,
          lang
        })}
      />

      <BaseLink
        href={PATHS.MISC_TOS.href}
        as={PATHS.MISC_TOS.as}
        text={translate({
          zh_hant: TEXT.zh_hant.term,
          zh_hans: TEXT.zh_hans.term,
          lang
        })}
      />

      <p className="item">© {year} Matters</p>

      <style jsx>{styles}</style>
    </footer>
  )
}
