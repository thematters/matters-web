import Link from 'next/link'
import { useContext } from 'react'

import { Icon, Menu, TextIcon, Translate } from '~/components'
import { useMutation } from '~/components/GQL'
import USER_LOGOUT from '~/components/GQL/mutations/userLogout'
import { ViewerContext } from '~/components/Viewer'

import { ADD_TOAST, ANALYTICS_EVENTS, PATHS, TEXT } from '~/common/enums'
import {
  analytics,
  // clearPersistCache,
  redirectToTarget,
  toPath,
  unsubscribePush
} from '~/common/utils'

import { UserLogout } from '~/components/GQL/mutations/__generated__/UserLogout'

const DropdownMenu = ({ hideDropdown }: { hideDropdown: () => void }) => {
  const [logout] = useMutation<UserLogout>(USER_LOGOUT)
  const viewer = useContext(ViewerContext)
  const userPath = toPath({
    page: 'userProfile',
    userName: viewer.userName || ''
  })
  const userHistoryPath = toPath({
    page: 'userHistory',
    userName: viewer.userName || ''
  })
  const onClickLogout = async () => {
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
  }

  return (
    <Menu>
      <Menu.Item>
        <Link {...userPath}>
          <a onClick={hideDropdown}>
            <TextIcon icon={<Icon.ProfileMedium />} spacing="xtight">
              <Translate
                zh_hant={TEXT.zh_hant.myProfile}
                zh_hans={TEXT.zh_hans.myProfile}
              />
            </TextIcon>
          </a>
        </Link>
      </Menu.Item>

      <Menu.Item>
        <Link {...PATHS.ME_APPRECIATIONS_SENT}>
          <a onClick={hideDropdown}>
            <TextIcon icon={<Icon.Like />} spacing="xtight">
              <Translate
                zh_hant={TEXT.zh_hant.myAppreciations}
                zh_hans={TEXT.zh_hans.myAppreciations}
              />
            </TextIcon>
          </a>
        </Link>
      </Menu.Item>

      <Menu.Item>
        <Link {...userHistoryPath}>
          <a onClick={hideDropdown}>
            <TextIcon icon={<Icon.HistoryMedium />} spacing="xtight">
              <Translate
                zh_hant={TEXT.zh_hant.readHistory}
                zh_hans={TEXT.zh_hans.readHistory}
              />
            </TextIcon>
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
            <TextIcon icon={<Icon.SettingsMedium />} spacing="xtight">
              <Translate
                zh_hant={TEXT.zh_hant.setting}
                zh_hans={TEXT.zh_hans.setting}
              />
            </TextIcon>
          </a>
        </Link>
      </Menu.Item>

      <Menu.Item>
        <button type="button" onClick={onClickLogout}>
          <TextIcon icon={<Icon.LogoutMedium />} spacing="xtight">
            <Translate
              zh_hant={TEXT.zh_hant.logout}
              zh_hans={TEXT.zh_hans.logout}
            />
          </TextIcon>
        </button>
      </Menu.Item>
    </Menu>
  )
}

export default DropdownMenu
