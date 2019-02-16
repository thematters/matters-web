import classNames from 'classnames'
import Link from 'next/link'
import { withRouter, WithRouterProps } from 'next/router'
import { useState } from 'react'

import { Dropdown, Icon, Menu } from '~/components'

import { PATHS } from '~/common/enums'
import ICON_MENU from '~/static/icons/menu.svg?sprite'
import styles from './styles.css'

const DropdownContent: React.FC<WithRouterProps> = withRouter(({ router }) => {
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
            <a className={homeClasses}>發現</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href={PATHS.FOLLOW.fs} as={PATHS.FOLLOW.url}>
            <a className={followClasses}>追蹤</a>
          </Link>
        </Menu.Item>
      </Menu>
      <style jsx>{styles}</style>
    </>
  )
})

export default () => (
  <Dropdown
    content={<DropdownContent />}
    distance={8}
    theme="dropdown shadow-default"
  >
    <button type="button" aria-label="菜單" className="nav-button">
      <Icon
        id={ICON_MENU.id}
        viewBox={ICON_MENU.viewBox}
        style={{ width: 20, height: 16 }}
      />
      <style jsx>{styles}</style>
    </button>
  </Dropdown>
)
