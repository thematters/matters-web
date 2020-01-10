import Link from 'next/link'
import { useContext } from 'react'

import { Icon, LanguageContext, Menu, TextIcon } from '~/components'
import { useMutation } from '~/components/GQL'
import USER_LOGOUT from '~/components/GQL/mutations/userLogout'
import { Translate } from '~/components/Language'
import { ViewerContext } from '~/components/Viewer'

import { ADD_TOAST, ANALYTICS_EVENTS, PATHS, TEXT } from '~/common/enums'
import {
  analytics,
  // clearPersistCache,
  redirectToTarget,
  toPath,
  translate,
  unsubscribePush
} from '~/common/utils'

import { UserLogout } from '~/components/GQL/mutations/__generated__/UserLogout'

const DropdownMenu = ({ hideDropdown }: { hideDropdown: () => void }) => {
  const [logout] = useMutation<UserLogout>(USER_LOGOUT)
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
              icon={<Icon.Me />}
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
              icon={<Icon.Like />}
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
              icon={<Icon.ReadingHistory />}
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
              icon={<Icon.Settings />}
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

              try {
                await unsubscribePush()
                // await clearPersistCache()
              } catch (e) {
                console.error('Failed to unsubscribePush after logged out')
              }

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
            icon={<Icon.LogOut />}
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
