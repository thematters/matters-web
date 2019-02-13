import Tippy from '@tippy.js/react'
import Link from 'next/link'
import React, { forwardRef } from 'react'

import { Avatar, Icon, Menu, TextIcon } from '~/components'

import { PATHS } from '~/common/enums'
import ICON_GIFT from '~/static/icons/gift.svg'
import ICON_LOGOUT from '~/static/icons/logout.svg'
import ICON_MAT_BLACK from '~/static/icons/mat-black.svg'
import ICON_MAT_GOLD from '~/static/icons/mat-gold.svg?sprite'
import ICON_ME from '~/static/icons/me.svg'
import ICON_MENU from '~/static/icons/menu.svg?sprite'
import ICON_READING_HISTORY from '~/static/icons/reading-history.svg'
import ICON_SETTINGS from '~/static/icons/settings.svg'
import styles from './styles.css'

const DropdonwContent = () => (
  <>
    <Menu>
      <Menu.Item>
        <TextIcon
          icon={<Icon src={ICON_ME} size="small" />}
          text="個人頁面"
          spacing="xtight"
        />
      </Menu.Item>
      <Menu.Item>
        <TextIcon
          icon={<Icon src={ICON_MAT_BLACK} size="small" />}
          text="我的錢包"
          spacing="xtight"
        />
      </Menu.Item>
      <Menu.Item>
        <TextIcon
          icon={<Icon src={ICON_READING_HISTORY} size="small" />}
          text="瀏覽記錄"
          spacing="xtight"
        />
      </Menu.Item>
      <Menu.Item>
        <TextIcon
          icon={<Icon src={ICON_GIFT} size="small" />}
          text="邀請好友"
          spacing="xtight"
        />
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item>
        <TextIcon
          icon={<Icon src={ICON_SETTINGS} size="small" />}
          text="設定"
          spacing="xtight"
        />
      </Menu.Item>
      <Menu.Item>
        <TextIcon
          icon={<Icon src={ICON_LOGOUT} size="small" />}
          text="登出"
          spacing="xtight"
        />
      </Menu.Item>
    </Menu>
  </>
)

const MeDigest = forwardRef((props, ref) => {
  return (
    <button type="button" className="container" ref={ref}>
      <Avatar size="small" />
      <section className="info u-text-truncate">
        <span className="username">Matty</span>
        <TextIcon
          icon={
            <Icon
              size="xsmall"
              id={ICON_MAT_GOLD.id}
              viewBox={ICON_MAT_GOLD.viewBox}
            />
          }
          color="gold"
          weight="semibold"
          text="500"
          size="xs"
          spacing="0"
        />
      </section>
      <style jsx>{styles}</style>
    </button>
  )
})

export default () => (
  <Tippy content={<DropdonwContent />} trigger="click" interactive>
    <MeDigest />
  </Tippy>
)
