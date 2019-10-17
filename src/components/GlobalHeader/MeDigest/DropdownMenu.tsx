import _get from 'lodash/get'
import Link from 'next/link'
import { useContext } from 'react'
import { useMutation } from 'react-apollo'

import { Icon, LanguageContext, Menu, TextIcon } from '~/components'
import USER_LOGOUT from '~/components/GQL/mutations/userLogout'
import { Translate } from '~/components/Language'
import { ViewerContext } from '~/components/Viewer'

import { ADD_TOAST, ANALYTICS_EVENTS, PATHS, TEXT } from '~/common/enums'
import {
  analytics,
  // clearPersistCache,
  redirectToTarget,
  toPath,
  translate
} from '~/common/utils'
import ICON_LIKE from '~/static/icons/like.svg?sprite'
import ICON_LOGOUT from '~/static/icons/logout.svg?sprite'
import ICON_ME from '~/static/icons/me.svg?sprite'
import ICON_READING_HISTORY from '~/static/icons/reading-history.svg?sprite'
import ICON_SETTINGS from '~/static/icons/settings.svg?sprite'

const DropdownMenu = ({ hideDropdown }: { hideDropdown: () => void }) => {
  const [logout] = useMutation(USER_LOGOUT)
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
              icon={
                <Icon id={ICON_ME.id} viewBox={ICON_ME.viewBox} size="small" />
              }
              text={translate({
                zh_hant: TEXT.zh_hant.myProfile,
                zh_hans: TEXT.zh_hans.myProfile,
                lang
              })}
              spacing="xtight"
            />
          </a>
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link {...PATHS.ME_APPRECIATIONS_SENT}>
          <a onClick={hideDropdown}>
            <TextIcon
              icon={
                <Icon
                  id={ICON_LIKE.id}
                  viewBox={ICON_LIKE.viewBox}
                  size="small"
                />
              }
              text={translate({
                zh_hant: TEXT.zh_hant.myAppreciations,
                zh_hans: TEXT.zh_hans.myAppreciations,
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
                zh_hant: TEXT.zh_hant.readHistory,
                zh_hans: TEXT.zh_hans.readHistory,
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
              icon={
                <Icon
                  id={ICON_SETTINGS.id}
                  viewBox={ICON_SETTINGS.viewBox}
                  size="small"
                />
              }
              text={translate({
                zh_hant: TEXT.zh_hant.setting,
                zh_hans: TEXT.zh_hans.setting,
                lang
              })}
              spacing="xtight"
            />
          </a>
        </Link>
      </Menu.Item>
      <Menu.Item>
        <button
          type="button"
          onClick={async () => {
            try {
              await logout()
              analytics.trackEvent(ANALYTICS_EVENTS.LOG_OUT, {
                id: viewer.id
              })
              // await clearPersistCache()
              redirectToTarget()
            } catch (e) {
              window.dispatchEvent(
                new CustomEvent(ADD_TOAST, {
                  detail: {
                    color: 'red',
                    content: (
                      <Translate
                        zh_hant={TEXT.zh_hant.logoutFailed}
                        zh_hans={TEXT.zh_hans.logoutFailed}
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
              zh_hant: TEXT.zh_hant.logout,
              zh_hans: TEXT.zh_hans.logout,
              lang
            })}
            spacing="xtight"
          />
        </button>
      </Menu.Item>
    </Menu>
  )
}

export default DropdownMenu
