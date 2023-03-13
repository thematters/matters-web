import { FormattedMessage } from 'react-intl'

import {
  ADD_TOAST,
  COOKIE_TOKEN_NAME,
  COOKIE_USER_GROUP,
  PATHS,
} from '~/common/enums'
import { redirectToTarget, removeCookies } from '~/common/utils'
import {
  CardSpacing,
  IconHelp24,
  IconLogout24,
  IconSettings24,
  Menu,
  TextIcon,
  useMutation,
} from '~/components'
import USER_LOGOUT from '~/components/GQL/mutations/userLogout'
import { UserLogoutMutation } from '~/gql/graphql'

interface NavMenuBottomProps {
  isInSideDrawerNav?: boolean
}

const NavMenuBottom: React.FC<NavMenuBottomProps> = ({ isInSideDrawerNav }) => {
  const [logout] = useMutation<UserLogoutMutation>(USER_LOGOUT, undefined, {
    showToast: false,
  })
  const onClickLogout = async () => {
    try {
      await logout()

      removeCookies([COOKIE_TOKEN_NAME, COOKIE_USER_GROUP])

      window.dispatchEvent(
        new CustomEvent(ADD_TOAST, {
          detail: {
            color: 'green',
            content: (
              <FormattedMessage
                defaultMessage="Logged out successfully"
                description=""
              />
            ),
          },
        })
      )

      // await clearPersistCache()

      redirectToTarget()
    } catch (e) {
      window.dispatchEvent(
        new CustomEvent(ADD_TOAST, {
          detail: {
            color: 'red',
            content: (
              <FormattedMessage
                defaultMessage="Failed to log out, please try again."
                description=""
              />
            ),
          },
        })
      )
    }
  }

  const menuItemSpacing = isInSideDrawerNav
    ? (['base', 'loose'] as [CardSpacing, CardSpacing])
    : undefined
  const menuItemSize = isInSideDrawerNav ? 'xm' : 'md'

  return (
    <Menu spacingY={isInSideDrawerNav ? 0 : undefined}>
      <Menu.Item spacing={menuItemSpacing} href={PATHS.HELP} is="link">
        <TextIcon
          icon={<IconHelp24 size="md" />}
          spacing="base"
          size={menuItemSize}
        >
          <FormattedMessage defaultMessage="Help Center" description="" />
        </TextIcon>
      </Menu.Item>

      <Menu.Item spacing={menuItemSpacing} href={PATHS.ME_SETTINGS} is="link">
        <TextIcon
          icon={<IconSettings24 size="md" />}
          spacing="base"
          size={menuItemSize}
        >
          <FormattedMessage defaultMessage="Settings" description="" />
        </TextIcon>
      </Menu.Item>

      <Menu.Item spacing={menuItemSpacing} onClick={onClickLogout}>
        <TextIcon
          icon={<IconLogout24 size="md" />}
          spacing="base"
          size={menuItemSize}
        >
          <FormattedMessage defaultMessage="Log Out" description="" />
        </TextIcon>
      </Menu.Item>
    </Menu>
  )
}

export default NavMenuBottom
