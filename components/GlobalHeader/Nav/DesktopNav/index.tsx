import classNames from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { Translate } from '~/components'

import { PATHS, TEXT } from '~/common/enums'

import styles from './styles.css'

const DesktopNav: React.FC<{
  unread: boolean
}> = ({ unread }) => {
  const router = useRouter()
  const homeClasses = classNames({
    'nav-link': true,
    active: router && router.pathname === PATHS.HOME.href
  })
  const followClasses = classNames({
    'nav-link': true,
    active: router && router.pathname === PATHS.FOLLOW.href
  })
  const followTextClass = classNames({
    follow: true,
    unread
  })

  return (
    <>
      <Link {...PATHS.HOME}>
        <a className={homeClasses}>
          <Translate
            zh_hant={TEXT.zh_hant.discover}
            zh_hans={TEXT.zh_hans.discover}
          />
        </a>
      </Link>
      <Link {...PATHS.FOLLOW}>
        <a className={followClasses}>
          <span className={followTextClass}>
            <Translate
              zh_hant={TEXT.zh_hant.follow}
              zh_hans={TEXT.zh_hans.follow}
            />
          </span>
        </a>
      </Link>
      <style jsx>{styles}</style>
    </>
  )
}

export default DesktopNav
