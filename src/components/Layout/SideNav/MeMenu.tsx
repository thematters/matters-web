import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import { ReactComponent as IconCircle } from '@/public/static/icons/24px/circle.svg'
import { ReactComponent as IconData } from '@/public/static/icons/24px/data.svg'
import { ReactComponent as IconDraft } from '@/public/static/icons/24px/draft.svg'
import { ReactComponent as IconHistory } from '@/public/static/icons/24px/history.svg'
import { ReactComponent as IconLogout } from '@/public/static/icons/24px/logout.svg'
import { ReactComponent as IconProfile } from '@/public/static/icons/24px/profile.svg'
import { ReactComponent as IconSave } from '@/public/static/icons/24px/save.svg'
import { ReactComponent as IconSettings } from '@/public/static/icons/24px/settings.svg'
import { ReactComponent as IconWallet } from '@/public/static/icons/24px/wallet.svg'
import { COOKIE_TOKEN_NAME, COOKIE_USER_GROUP, PATHS } from '~/common/enums'
import { toPath } from '~/common/utils'
import { redirectToTarget, removeCookies } from '~/common/utils'
import { Icon, Menu, toast, useMutation, ViewerContext } from '~/components'
import USER_LOGOUT from '~/components/GQL/mutations/userLogout'
import { UserLogoutMutation } from '~/gql/graphql'

const MeMenu: React.FC = () => {
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

  const [logout] = useMutation<UserLogoutMutation>(USER_LOGOUT, undefined, {
    showToast: false,
  })
  const onClickLogout = async () => {
    try {
      await logout()

      removeCookies([COOKIE_TOKEN_NAME, COOKIE_USER_GROUP])

      redirectToTarget()
    } catch (e) {
      toast.error({
        message: (
          <FormattedMessage
            defaultMessage="Failed to log out, please try again."
            id="Szd1tH"
          />
        ),
      })
    }
  }

  return (
    <Menu>
      <Menu.Item
        text={<FormattedMessage defaultMessage="Profile" id="itPgxd" />}
        icon={<Icon icon={IconProfile} size={20} />}
        {...viewerPath}
        is="link"
      />

      <Menu.Item
        text={<FormattedMessage defaultMessage="History" id="djJp6c" />}
        icon={<Icon icon={IconHistory} size={20} />}
        href={PATHS.ME_HISTORY}
        is="link"
      />

      <Menu.Item
        text={<FormattedMessage defaultMessage="Bookmarks" id="nGBrvw" />}
        icon={<Icon icon={IconSave} size={20} />}
        href={PATHS.ME_BOOKMARKS}
        is="link"
      />

      <Menu.Item
        text={<FormattedMessage defaultMessage="My Works" id="ai7kS4" />}
        icon={<Icon icon={IconDraft} size={20} />}
        href={PATHS.ME_DRAFTS}
        is="link"
      />

      {circlePath && (
        <Menu.Item
          text={<FormattedMessage defaultMessage="Circle" id="vH8sCb" />}
          icon={<Icon icon={IconCircle} size={20} />}
          href={circlePath.href}
          is="link"
        />
      )}

      <Menu.Item
        text={<FormattedMessage defaultMessage="Wallet" id="3yk8fB" />}
        icon={<Icon icon={IconWallet} size={20} />}
        href={PATHS.ME_WALLET}
        is="link"
      />

      <Menu.Item
        text={<FormattedMessage defaultMessage="Stats" id="U86B6w" />}
        icon={<Icon icon={IconData} size={20} />}
        href={PATHS.ME_ANALYTICS}
        is="link"
      />

      <Menu.Divider />

      <Menu.Item
        text={<FormattedMessage defaultMessage="Settings" id="D3idYv" />}
        icon={<Icon icon={IconSettings} size={20} />}
        href={PATHS.ME_SETTINGS}
        is="link"
      />

      <Menu.Item
        text={<FormattedMessage defaultMessage="Log Out" id="H0JBH6" />}
        icon={<Icon icon={IconLogout} size={20} />}
        onClick={onClickLogout}
      />
    </Menu>
  )
}

export default MeMenu
