import classNames from 'classnames'
import Link from 'next/link'
import { withRouter, WithRouterProps } from 'next/router'

import { Translate } from '~/components'

import { PATHS, TEXT } from '~/common/enums'

import styles from './styles.css'

const DesktopNav: React.FC<WithRouterProps> = ({ router }) => {
  const homeClasses = classNames({
    'nav-link': true,
    active: router && router.pathname === PATHS.HOME.href
  })
  const followClasses = classNames({
    'nav-link': true,
    active: router && router.pathname === PATHS.FOLLOW.href
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
          <Translate
            zh_hant={TEXT.zh_hant.follow}
            zh_hans={TEXT.zh_hans.follow}
          />
        </a>
      </Link>
      <style jsx>{styles}</style>
    </>
  )
}

export default withRouter(DesktopNav)
