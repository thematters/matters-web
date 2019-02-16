import classNames from 'classnames'
import Link from 'next/link'
import { withRouter, WithRouterProps } from 'next/router'

import { Menu } from '~/components'

import { PATHS } from '~/common/enums'
import styles from './styles.css'

const DropdownContent: React.FC<
  WithRouterProps & {
    hideDropdown: () => void
  }
> = ({ router, hideDropdown }) => {
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
      <Menu>
        <Menu.Item>
          <Link href={PATHS.HOME.fs} as={PATHS.HOME.url}>
            <a onClick={hideDropdown} className={homeClasses}>
              發現
            </a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href={PATHS.FOLLOW.fs} as={PATHS.FOLLOW.url}>
            <a onClick={hideDropdown} className={followClasses}>
              追蹤
            </a>
          </Link>
        </Menu.Item>
      </Menu>
      <style jsx>{styles}</style>
    </>
  )
}

export default withRouter(DropdownContent)
