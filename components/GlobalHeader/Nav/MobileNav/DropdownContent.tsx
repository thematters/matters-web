import classNames from 'classnames'
import Link from 'next/link'
import { withRouter, WithRouterProps } from 'next/router'

import { Translate } from '~/components/Language'
import { Menu } from '~/components/Menu'

import { PATHS } from '~/common/enums'

import styles from './styles.css'

const DropdownContent: React.FC<
  WithRouterProps & {
    hideDropdown: () => void
  }
> = ({ router, hideDropdown }) => {
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
      <Menu>
        <Menu.Item>
          <Link href={PATHS.HOME.href} as={PATHS.HOME.as}>
            <a onClick={hideDropdown} className={homeClasses}>
              <Translate zh_hant="發現" zh_hans="发现" />
            </a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href={PATHS.FOLLOW.href} as={PATHS.FOLLOW.as}>
            <a onClick={hideDropdown} className={followClasses}>
              <Translate zh_hant="追蹤" zh_hans="追踪" />
            </a>
          </Link>
        </Menu.Item>
      </Menu>
      <style jsx>{styles}</style>
    </>
  )
}

export default withRouter(DropdownContent)
