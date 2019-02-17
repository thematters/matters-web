import classNames from 'classnames'
import Link from 'next/link'
import { withRouter, WithRouterProps } from 'next/router'

import { PATHS } from '~/common/enums'
import styles from './styles.css'

const DesktopNav: React.FC<WithRouterProps> = ({ router }) => {
  const homeClasses = classNames({
    'nav-link': true,
    active: router && router.pathname === PATHS.HOME.fs
  })
  const followClasses = classNames({
    'nav-link': true,
    active: router && router.pathname === PATHS.FOLLOW.fs
  })

  return (
    <>
      <Link href={PATHS.HOME.fs} as={PATHS.HOME.url}>
        <a className={homeClasses}>發現</a>
      </Link>
      <Link href={PATHS.FOLLOW.fs} as={PATHS.FOLLOW.url}>
        <a className={followClasses}>追蹤</a>
      </Link>
      <style jsx>{styles}</style>
    </>
  )
}

export default withRouter(DesktopNav)
