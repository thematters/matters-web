import classNames from 'classnames'
import gql from 'graphql-tag'
import _get from 'lodash/get'
import Link from 'next/link'
import { useContext } from 'react'

import { Icon, LanguageContext, Menu, TextIcon } from '~/components'
import { Mutation } from '~/components/GQL'
import { Translate } from '~/components/Language'
import { ViewerContext } from '~/components/Viewer'

import { ANALYTICS_EVENTS, PATHS } from '~/common/enums'
import { analytics, redirectToTarget, toPath, translate } from '~/common/utils'
import ICON_GIFT from '~/static/icons/gift.svg?sprite'
import ICON_LOGOUT from '~/static/icons/logout.svg?sprite'
import ICON_MAT_BLACK from '~/static/icons/mat-black.svg?sprite'
import ICON_ME from '~/static/icons/me.svg?sprite'
import ICON_READING_HISTORY from '~/static/icons/reading-history.svg?sprite'
import ICON_SETTINGS from '~/static/icons/settings.svg?sprite'

import styles from './styles.css'

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
  const invitationsClass = classNames({
    invitations: true,
    unread: _get(viewer, 'status.invitation.left', 0) > 0
  })

  return (
    <Menu>
      <Menu.Item>
        <Link {...userPath}>
          <a onClick={hideDropdown}>
            <TextIcon
              icon={
                <Icon id={ICON_ME.id} viewBox={ICON_ME.viewBox} size="small" />
              }
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
              icon={
                <Icon
                  id={ICON_MAT_BLACK.id}
                  viewBox={ICON_MAT_BLACK.viewBox}
                  size="small"
                />
              }
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
              icon={
                <Icon
                  id={ICON_READING_HISTORY.id}
                  viewBox={ICON_READING_HISTORY.viewBox}
                  size="small"
                />
              }
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
      { viewer.isActive === true &&
        <Menu.Item>
          <Link href={PATHS.ME_INVITATIONS.href} as={PATHS.ME_INVITATIONS.as}>
            <a onClick={hideDropdown}>
              <TextIcon
                icon={
                  <Icon
                    id={ICON_GIFT.id}
                    viewBox={ICON_GIFT.viewBox}
                    size="small"
                  />
                }
                spacing="xtight"
              >
                <span className={invitationsClass}>
                  <Translate zh_hant="邀請好友" zh_hans="邀请好友" />
                  <style jsx>{styles}</style>
                </span>
              </TextIcon>
            </a>
          </Link>
        </Menu.Item>
      }
      <Menu.Divider />
      <Menu.Item>
        <Link
          href={PATHS.ME_SETTINGS_ACCOUNT.href}
          as={PATHS.ME_SETTINGS_ACCOUNT.as}
        >
          <a onClick={hideDropdown}>
            <TextIcon
              icon={
                <Icon
                  id={ICON_SETTINGS.id}
                  viewBox={ICON_SETTINGS.viewBox}
                  size="small"
                />
              }
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
              onClick={async () => {
                try {
                  await logout()
                  analytics.trackEvent(ANALYTICS_EVENTS.LOG_OUT, {
                    id: viewer.id
                  })
                  redirectToTarget()
                } catch (e) {
                  window.dispatchEvent(
                    new CustomEvent('addToast', {
                      detail: {
                        color: 'red',
                        content: (
                          <Translate
                            zh_hant="登出失敗，請重試"
                            zh_hans="登出失败，请重试"
                          />
                        )
                      }
                    })
                  )
                }
              }}
            >
              <TextIcon
                icon={
                  <Icon
                    id={ICON_LOGOUT.id}
                    viewBox={ICON_LOGOUT.viewBox}
                    size="small"
                  />
                }
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
