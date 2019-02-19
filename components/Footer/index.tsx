// External modules
import classNames from 'classnames'
import Link from 'next/link'

// Internal modules
import { PATHS } from '~/common/enums'
import styles from './styles.css'

const linkClass = classNames('item', 'item-link')

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
      <a className={linkClass}>{text}</a>
    </Link>
    <style jsx>{styles}</style>
  </>
)

export const Footer = () => (
  <>
    <footer className="l-row footer">
      <BaseLink href={'/'} as={'/'} text={'意見反饋'} />
      <BaseLink
        href={PATHS.MISC_ABOUT.href}
        as={PATHS.MISC_ABOUT.as}
        text={'關於我們'}
      />
      <BaseLink
        href={PATHS.MISC_FAQ.href}
        as={PATHS.MISC_FAQ.as}
        text={'常見問題'}
      />
      <BaseLink
        href={PATHS.MISC_GUIDE.href}
        as={PATHS.MISC_GUIDE.as}
        text={'用戶指南'}
      />
      <BaseLink
        href={PATHS.MISC_TOS.href}
        as={PATHS.MISC_TOS.as}
        text={'用戶協議'}
      />
      <BaseLink href={'/'} as={'/'} text={'下載 App'} />
      <p className="item">© 2019 Matters</p>
    </footer>
    <style jsx>{styles}</style>
  </>
)
