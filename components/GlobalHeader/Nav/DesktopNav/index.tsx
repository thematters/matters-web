import classNames from 'classnames'
import Link from 'next/link'
import { withRouter, WithRouterProps } from 'next/router'

import { Translate } from '~/components'

import { PATHS } from '~/common/enums'

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
          <Translate zh_hant="發現" zh_hans="发现" />
        </a>
      </Link>
      <Link {...PATHS.FOLLOW}>
        <a className={followClasses}>
          <Translate zh_hant="追蹤" zh_hans="追踪" />
        </a>
      </Link>
      <style jsx>{styles}</style>
    </>
  )
}

export default withRouter(DesktopNav)
