import classNames from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { Translate } from '~/components'

import { PATHS } from '~/common/enums'

import styles from './styles.css'

const DesktopNav: React.FC<{ unread: boolean }> = ({ unread }) => {
  const router = useRouter()
  const homeClasses = classNames({
    'nav-link': true,
    active: router.pathname === PATHS.HOME.href
  })
  const followClasses = classNames({
    'nav-link': true,
    active: router.pathname === PATHS.FOLLOW.href
  })
  const followTextClass = classNames({
    follow: true,
    unread
  })

  return (
    <>
      <Link {...PATHS.HOME}>
        <a className={homeClasses}>
          <Translate id="discover" />
        </a>
      </Link>

      <Link {...PATHS.FOLLOW}>
        <a className={followClasses}>
          <span className={followTextClass}>
            <Translate id="follow" />
          </span>
        </a>
      </Link>

      <style jsx>{styles}</style>
    </>
  )
}

export default DesktopNav
