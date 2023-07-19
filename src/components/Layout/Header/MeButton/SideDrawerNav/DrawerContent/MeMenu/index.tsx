import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import { COOKIE_TOKEN_NAME, COOKIE_USER_GROUP, PATHS } from '~/common/enums'
import { toPath } from '~/common/utils'
import { redirectToTarget, removeCookies } from '~/common/utils'
import {
  IconAnalytics24,
  IconBookmark24,
  IconCircle24,
  IconDraft24,
  IconHistory24,
  IconLogout24,
  IconProfile24,
  IconSettings24,
  IconWallet24,
  Menu,
  toast,
  useMutation,
  ViewerContext,
} from '~/components'
import USER_LOGOUT from '~/components/GQL/mutations/userLogout'
import type { MenuItemProps } from '~/components/Menu/Item'
import { UserLogoutMutation } from '~/gql/graphql'

const menuItemProps = {
  spacing: ['base', 'loose'],
  textColor: 'black',
  size: 'xm',
} as MenuItemProps

const Top: React.FC = () => {
  const viewer = useContext(ViewerContext)
  const viewerPath = toPath({
    page: 'userProfile',
    userName: viewer.userName || '',
  })

  const circle = viewer.ownCircles && viewer.ownCircles[0]
  const circlePath =
    circle &&
    toPath({
      page: 'circleDetail',
      circle,
    })

  return (
    <Menu>
      <Menu.Item
        {...menuItemProps}
        text={<FormattedMessage defaultMessage="Profile" />}
        icon={<IconProfile24 size="md" />}
        {...viewerPath}
        is="link"
      />

      <Menu.Item
        {...menuItemProps}
        text={<FormattedMessage defaultMessage="History" />}
        icon={<IconHistory24 size="md" />}
        href={PATHS.ME_HISTORY}
        is="link"
      />

      <Menu.Item
        {...menuItemProps}
        text={<FormattedMessage defaultMessage="Bookmarks" />}
        icon={<IconBookmark24 size="md" />}
        href={PATHS.ME_BOOKMARKS}
        is="link"
      />

      <Menu.Item
        {...menuItemProps}
        text={<FormattedMessage defaultMessage="Drafts" />}
        icon={<IconDraft24 size="md" />}
        href={PATHS.ME_DRAFTS}
        is="link"
      />

      {circlePath && (
        <Menu.Item
          {...menuItemProps}
          text={<FormattedMessage defaultMessage="Circle" />}
          icon={<IconCircle24 size="md" />}
          href={circlePath.href}
          is="link"
        />
      )}

      <Menu.Item
        {...menuItemProps}
        text={<FormattedMessage defaultMessage="Wallet" />}
        icon={<IconWallet24 size="md" />}
        href={PATHS.ME_WALLET}
        is="link"
      />

      <Menu.Item
        {...menuItemProps}
        text={<FormattedMessage defaultMessage="Stats" />}
        icon={<IconAnalytics24 size="md" />}
        href={PATHS.ME_ANALYTICS}
        is="link"
      />
    </Menu>
  )
}

const Bottom = () => {
  const [logout] = useMutation<UserLogoutMutation>(USER_LOGOUT, undefined, {
    showToast: false,
  })
  const onClickLogout = async () => {
    try {
      await logout()

      removeCookies([COOKIE_TOKEN_NAME, COOKIE_USER_GROUP])

      toast.success({
        message: <FormattedMessage defaultMessage="Logged out successfully" />,
      })

      // await clearPersistCache()

      redirectToTarget()
    } catch (e) {
      toast.error({
        message: (
          <FormattedMessage defaultMessage="Failed to log out, please try again." />
        ),
      })
    }
  }

  return (
    <Menu>
      <Menu.Item
        {...menuItemProps}
        text={<FormattedMessage defaultMessage="Settings" />}
        icon={<IconSettings24 size="md" />}
        href={PATHS.ME_SETTINGS}
        is="link"
      />

      <Menu.Item
        {...menuItemProps}
        text={<FormattedMessage defaultMessage="Log Out" />}
        icon={<IconLogout24 size="md" />}
        onClick={onClickLogout}
      />
    </Menu>
  )
}

const MeMenu = {
  Top,
  Bottom,
}

export default MeMenu
