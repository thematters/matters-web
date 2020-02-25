import { useContext } from 'react'

import { Icon, Menu, TextIcon, Translate, ViewerContext } from '~/components'
import { useMutation } from '~/components/GQL'
import USER_LOGOUT from '~/components/GQL/mutations/userLogout'

import { ADD_TOAST, ANALYTICS_EVENTS, PATHS, TEXT } from '~/common/enums'
import {
  analytics,
  // clearPersistCache,
  redirectToTarget,
  toPath,
  unsubscribePush
} from '~/common/utils'

import { UserLogout } from '~/components/GQL/mutations/__generated__/UserLogout'

const DropdownMenu = ({ type }: { type: 'dialog' | 'dropdown' }) => {
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

      window.dispatchEvent(
        new CustomEvent(ADD_TOAST, {
          detail: {
            color: 'green',
            content: <Translate zh_hant="登出成功" zh_hans="登出成功" />
          }
        })
      )

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
                zh_hant={TEXT.zh_hant.failureLogout}
                zh_hans={TEXT.zh_hans.failureLogout}
              />
            )
          }
        })
      )
    }
  }
  const isDropdown = type === 'dropdown'

  return (
    <Menu width={isDropdown ? 'sm' : undefined}>
      <Menu.Item {...userPath}>
        <TextIcon
          icon={<Icon.ProfileMedium size="md" />}
          spacing="base"
          size="md"
        >
          <Translate
            zh_hant={TEXT.zh_hant.myProfile}
            zh_hans={TEXT.zh_hans.myProfile}
          />
        </TextIcon>
      </Menu.Item>

      <Menu.Item {...PATHS.ME_APPRECIATIONS_SENT}>
        <TextIcon icon={<Icon.LikeMedium size="md" />} spacing="base" size="md">
          <Translate
            zh_hant={TEXT.zh_hant.myAppreciations}
            zh_hans={TEXT.zh_hans.myAppreciations}
          />
        </TextIcon>
      </Menu.Item>

      <Menu.Item {...userHistoryPath}>
        <TextIcon
          icon={<Icon.HistoryMedium size="md" />}
          spacing="base"
          size="md"
        >
          <Translate
            zh_hant={TEXT.zh_hant.readHistory}
            zh_hans={TEXT.zh_hans.readHistory}
          />
        </TextIcon>
      </Menu.Item>

      <Menu.Divider />

      <Menu.Item {...PATHS.ME_SETTINGS_ACCOUNT}>
        <TextIcon
          icon={<Icon.SettingsMedium size="md" />}
          spacing="base"
          size="md"
        >
          <Translate
            zh_hant={TEXT.zh_hant.setting}
            zh_hans={TEXT.zh_hans.setting}
          />
        </TextIcon>
      </Menu.Item>

      <Menu.Item onClick={onClickLogout}>
        <TextIcon
          icon={<Icon.LogoutMedium size="md" />}
          spacing="base"
          size="md"
        >
          <Translate
            zh_hant={TEXT.zh_hant.logout}
            zh_hans={TEXT.zh_hans.logout}
          />
        </TextIcon>
      </Menu.Item>
    </Menu>
  )
}

export default DropdownMenu
