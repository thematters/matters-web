import classNames from 'classnames'
import Link from 'next/link'
import { useContext } from 'react'

import { LanguageContext } from '~/components'

import { PATHS } from '~/common/enums'
import { translate } from '~/common/utils'

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

export const Footer = () => {
  const { lang } = useContext(LanguageContext)

  return (
    <footer className="footer">
      <BaseLink
        href={'/'}
        as={'/'}
        text={translate({ zh_hant: '意見反饋', zh_hans: '意见反馈', lang })}
      />
      <BaseLink
        href={PATHS.MISC_ABOUT.href}
        as={PATHS.MISC_ABOUT.as}
        text={translate({ zh_hant: '關於我們', zh_hans: '关于我们', lang })}
      />
      <BaseLink
        href={PATHS.MISC_FAQ.href}
        as={PATHS.MISC_FAQ.as}
        text={translate({ zh_hant: '常見問題', zh_hans: '常见问题', lang })}
      />
      <BaseLink
        href={PATHS.MISC_GUIDE.href}
        as={PATHS.MISC_GUIDE.as}
        text={translate({ zh_hant: '用戶指南', zh_hans: '用户指南', lang })}
      />
      <BaseLink
        href={PATHS.MISC_TOS.href}
        as={PATHS.MISC_TOS.as}
        text={translate({ zh_hant: '用戶協議', zh_hans: '用户协议', lang })}
      />
      <BaseLink
        href={'/'}
        as={'/'}
        text={translate({ zh_hant: '下載 App', zh_hans: '下载 App', lang })}
      />
      <p className="item">© 2019 Matters</p>
      <style jsx>{styles}</style>
    </footer>
  )
}
