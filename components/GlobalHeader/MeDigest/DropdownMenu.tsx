import Link from 'next/link'

import { PATHS } from '~/common/enums'
import ICON_GIFT from '~/static/icons/gift.svg'
import ICON_LOGOUT from '~/static/icons/logout.svg'
import ICON_MAT_BLACK from '~/static/icons/mat-black.svg'
import ICON_ME from '~/static/icons/me.svg'
import ICON_READING_HISTORY from '~/static/icons/reading-history.svg'
import ICON_SETTINGS from '~/static/icons/settings.svg'

import { Icon, Menu, TextIcon } from '~/components'

const DropdownMenu = ({ hideDropdown }: { hideDropdown: () => void }) => (
  <Menu>
    <Menu.Item>
      <Link href={PATHS.ME_ARTICLES.href} as={PATHS.ME_ARTICLES.as}>
        <a onClick={hideDropdown}>
          <TextIcon
            icon={<Icon src={ICON_ME} size="small" />}
            text="個人頁面"
            spacing="xtight"
          />
        </a>
      </Link>
    </Menu.Item>
    <Menu.Item>
      <Link href={PATHS.ME_WALLET.href} as={PATHS.ME_WALLET.as}>
        <a onClick={hideDropdown}>
          <TextIcon
            icon={<Icon src={ICON_MAT_BLACK} size="small" />}
            text="我的錢包"
            spacing="xtight"
          />
        </a>
      </Link>
    </Menu.Item>
    <Menu.Item>
      <Link href={PATHS.ME_HISTORY.href} as={PATHS.ME_HISTORY.as}>
        <a onClick={hideDropdown}>
          <TextIcon
            icon={<Icon src={ICON_READING_HISTORY} size="small" />}
            text="瀏覽記錄"
            spacing="xtight"
          />
        </a>
      </Link>
    </Menu.Item>
    <Menu.Item>
      <Link href={PATHS.ME_INVITATION.href} as={PATHS.ME_INVITATION.as}>
        <a onClick={hideDropdown}>
          <TextIcon
            icon={<Icon src={ICON_GIFT} size="small" />}
            text="邀請好友"
            spacing="xtight"
          />
        </a>
      </Link>
    </Menu.Item>

    <Menu.Divider />

    <Menu.Item>
      <Link
        href={PATHS.ME_SETTINGS_ACCOUNT.href}
        as={PATHS.ME_SETTINGS_ACCOUNT.as}
      >
        <a onClick={hideDropdown}>
          <TextIcon
            icon={<Icon src={ICON_SETTINGS} size="small" />}
            text="設定"
            spacing="xtight"
          />
        </a>
      </Link>
    </Menu.Item>
    <Menu.Item>
      <button
        type="button"
        onClick={() => {
          alert('[TEST] logout')
          hideDropdown()
        }}
      >
        <TextIcon
          icon={<Icon src={ICON_LOGOUT} size="small" />}
          text="登出"
          spacing="xtight"
        />
      </button>
    </Menu.Item>
  </Menu>
)

export default DropdownMenu
