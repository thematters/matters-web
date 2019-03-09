import gql from 'graphql-tag'
import Link from 'next/link'
import Router from 'next/router'
import { useContext } from 'react'
import { Mutation } from 'react-apollo'

import { Icon, LanguageContext, Menu, TextIcon } from '~/components'
import { ViewerContext } from '~/components/Viewer'

import { PATHS } from '~/common/enums'
import { toPath, translate } from '~/common/utils'
import ICON_GIFT from '~/static/icons/gift.svg'
import ICON_LOGOUT from '~/static/icons/logout.svg'
import ICON_MAT_BLACK from '~/static/icons/mat-black.svg'
import ICON_ME from '~/static/icons/me.svg'
import ICON_READING_HISTORY from '~/static/icons/reading-history.svg'
import ICON_SETTINGS from '~/static/icons/settings.svg'

const DropdownMenu = ({ hideDropdown }: { hideDropdown: () => void }) => {
  const { lang } = useContext(LanguageContext)
  const viewer = useContext(ViewerContext)
  const userPath = toPath({
    page: 'userProfile',
    userName: viewer.userName || ''
  })
  const userHistoryPath = toPath({
    page: 'userHistory',
    userName: viewer.userName || ''
  })

  return (
    <Menu>
      <Menu.Item>
        <Link {...userPath}>
          <a onClick={hideDropdown}>
            <TextIcon
              icon={<Icon src={ICON_ME} size="small" />}
              text={translate({
                zh_hant: '個人頁面',
                zh_hans: '个人页面',
                lang
              })}
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
              text={translate({
                zh_hant: '我的錢包',
                zh_hans: '我的钱包',
                lang
              })}
              spacing="xtight"
            />
          </a>
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link {...userHistoryPath}>
          <a onClick={hideDropdown}>
            <TextIcon
              icon={<Icon src={ICON_READING_HISTORY} size="small" />}
              text={translate({
                zh_hant: '瀏覽記錄',
                zh_hans: '浏览记录',
                lang
              })}
              spacing="xtight"
            />
          </a>
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link href={PATHS.ME_INVITATIONS.href} as={PATHS.ME_INVITATIONS.as}>
          <a onClick={hideDropdown}>
            <TextIcon
              icon={<Icon src={ICON_GIFT} size="small" />}
              text={translate({
                zh_hant: '邀請好友',
                zh_hans: '邀请好友',
                lang
              })}
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
              text={translate({
                zh_hant: '設定',
                zh_hans: '设定',
                lang
              })}
              spacing="xtight"
            />
          </a>
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Mutation
          mutation={gql`
            mutation UserLogout {
              userLogout
            }
          `}
        >
          {logout => (
            <button
              type="button"
              onClick={() => {
                logout().then(() => Router.push(PATHS.HOME.href, PATHS.HOME.as)) // redirect to home after logout
              }}
            >
              <TextIcon
                icon={<Icon src={ICON_LOGOUT} size="small" />}
                text={translate({
                  zh_hant: '登出',
                  zh_hans: '登出',
                  lang
                })}
                spacing="xtight"
              />
            </button>
          )}
        </Mutation>
      </Menu.Item>
    </Menu>
  )
}

export default DropdownMenu
