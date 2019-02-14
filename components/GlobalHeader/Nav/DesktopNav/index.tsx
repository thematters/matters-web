import classNames from 'classnames'
import Link from 'next/link'
import { withRouter, WithRouterProps } from 'next/router'

import { PATHS } from '~/common/enums'
import styles from './styles.css'

const DesktopNav: React.SFC<WithRouterProps> = ({ router, ...rest }) => {
  const homeClasses = classNames({
    active: router && router.pathname === PATHS.HOMEPAGE.fs
  })
  const followClasses = classNames({
    active: router && router.pathname === PATHS.FOLLOW.fs
  })

  return (
    <>
      <Link href={PATHS.HOMEPAGE.fs} as={PATHS.HOMEPAGE.url}>
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
