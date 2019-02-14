import Link from 'next/link'

import { Dropdown, Icon, Menu } from '~/components'

import { PATHS } from '~/common/enums'
import ICON_MENU from '~/static/icons/menu.svg?sprite'
import styles from './styles.css'

const DropdonwContent = () => (
  <>
    <Menu>
      <Menu.Item>
        <Link href={PATHS.HOMEPAGE.fs} as={PATHS.HOMEPAGE.url}>
          <a>發現</a>
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link href={PATHS.FOLLOW.fs} as={PATHS.FOLLOW.url}>
          <a>追蹤</a>
        </Link>
      </Menu.Item>
    </Menu>
    <style jsx>{styles}</style>
  </>
)

export default () => (
  <>
    <Dropdown
      content={<DropdonwContent />}
      distance={8}
      theme="dropdown shadow-default"
    >
      <button type="button">
        <Icon
          id={ICON_MENU.id}
          viewBox={ICON_MENU.viewBox}
          style={{ width: 20, height: 16 }}
        />
      </button>
    </Dropdown>
    <style jsx>{styles}</style>
  </>
)
