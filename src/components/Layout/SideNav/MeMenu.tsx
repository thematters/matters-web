import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import {
  ADD_TOAST,
  COOKIE_TOKEN_NAME,
  COOKIE_USER_GROUP,
  PATHS,
} from '~/common/enums'
import { toPath } from '~/common/utils'
import { redirectToTarget, removeCookies } from '~/common/utils'
import {
  IconAnalytics24,
  IconBookmark24,
  IconCircle24,
  IconClap24,
  IconDraft24,
  IconHelp24,
  IconHistory24,
  IconLogout24,
  IconProfile24,
  IconSettings24,
  IconWallet24,
  Menu,
  useFeatures,
  useMutation,
  ViewerContext,
} from '~/components'
import USER_LOGOUT from '~/components/GQL/mutations/userLogout'
import { UserLogoutMutation } from '~/gql/graphql'

const MeMenu: React.FC = () => {
  const viewer = useContext(ViewerContext)
  const features = useFeatures()
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

  return (
    <Menu>
      <Menu.Item
        text={<FormattedMessage defaultMessage="Profile" description="" />}
        icon={<IconProfile24 size="mdS" />}
        {...viewerPath}
        is="link"
      />

      {circlePath && (
        <Menu.Item
          text={<FormattedMessage defaultMessage="Circle" description="" />}
          icon={<IconCircle24 size="mdS" />}
          href={circlePath.href}
          is="link"
        />
      )}

      <Menu.Item
        text={<FormattedMessage defaultMessage="Drafts" description="" />}
        icon={<IconDraft24 size="mdS" />}
        href={PATHS.ME_DRAFTS}
        is="link"
      />

      {(features.add_credit || features.payout) && (
        <Menu.Item
          text={<FormattedMessage defaultMessage="Wallet" description="" />}
          icon={<IconWallet24 size="mdS" />}
          href={PATHS.ME_WALLET}
          is="link"
        />
      )}
      <Menu.Item
        text={<FormattedMessage defaultMessage="Analytics" description="" />}
        icon={<IconAnalytics24 size="mdS" />}
        href={PATHS.ME_ANALYTICS}
        is="link"
      />

      <Menu.Item
        text={<FormattedMessage defaultMessage="Bookmarks" description="" />}
        icon={<IconBookmark24 size="mdS" />}
        href={PATHS.ME_BOOKMARKS}
        is="link"
      />

      <Menu.Item
        text={<FormattedMessage defaultMessage="Likes" description="" />}
        icon={<IconClap24 size="mdS" />}
        href={PATHS.ME_LIKES_SENT}
        is="link"
      />

      <Menu.Item
        text={<FormattedMessage defaultMessage="Read History" description="" />}
        icon={<IconHistory24 size="mdS" />}
        href={PATHS.ME_HISTORY}
        is="link"
      />

      <Menu.Divider />

      <Menu.Item
        text={<FormattedMessage defaultMessage="Help Center" description="" />}
        icon={<IconHelp24 size="mdS" />}
        href={PATHS.HELP}
        is="link"
      />

      <Menu.Item
        text={<FormattedMessage defaultMessage="Settings" description="" />}
        icon={<IconSettings24 size="mdS" />}
        href={PATHS.ME_SETTINGS}
        is="link"
      />

      <Menu.Item
        text={<FormattedMessage defaultMessage="Log Out" description="" />}
        icon={<IconLogout24 size="mdS" />}
        onClick={onClickLogout}
      />
    </Menu>
  )
}

export default MeMenu
