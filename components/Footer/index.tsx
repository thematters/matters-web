// External modules
import classNames from 'classnames'
import Link from 'next/link'

// Internal modules
import styles from './styles.css'

const linkClass = classNames('item', 'item-link')

const BaseLink = ({ href, as, text, style }) => (
  <>
    <Link href={href} as={as}>
      <a className={linkClass}>{text}</a>
    </Link>
    <style jsx>{styles}</style>
  </>
)

export const Footer = ({ style }) => (
  <>
    <footer className="l-row footer">
      <BaseLink href={'/'} as={'/'} text={'意見反饋'} />
      <BaseLink href={'/'} as={'/'} text={'關於我們'} />
      <BaseLink href={'/'} as={'/'} text={'常見問題'} />
      <BaseLink href={'/'} as={'/'} text={'版權聲明'} />
      <BaseLink href={'/'} as={'/'} text={'下載 App'} />
      <p className="item">© 2019 Matters</p>
    </footer>
    <style jsx>{styles}</style>
  </>
)
