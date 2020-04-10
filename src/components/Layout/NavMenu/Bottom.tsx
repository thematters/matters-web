import { useContext } from 'react';

import {
  CardSpacing,
  Icon,
  Menu,
  TextIcon,
  Translate,
  ViewerContext,
} from '~/components';
import { useMutation } from '~/components/GQL';
import USER_LOGOUT from '~/components/GQL/mutations/userLogout';

import { ADD_TOAST, ANALYTICS_EVENTS, PATHS } from '~/common/enums';
import {
  analytics,
  // clearPersistCache,
  redirectToTarget,
  unsubscribePush,
} from '~/common/utils';

import { UserLogout } from '~/components/GQL/mutations/__generated__/UserLogout';

interface NavMenuBottomProps {
  isInSideDrawerNav?: boolean;
}

const NavMenuBottom: React.FC<NavMenuBottomProps> = ({ isInSideDrawerNav }) => {
  const [logout] = useMutation<UserLogout>(USER_LOGOUT);
  const viewer = useContext(ViewerContext);
  const onClickLogout = async () => {
    try {
      await logout();

      analytics.trackEvent(ANALYTICS_EVENTS.LOG_OUT, { id: viewer.id });

      window.dispatchEvent(
        new CustomEvent(ADD_TOAST, {
          detail: {
            color: 'green',
            content: <Translate id="successLogout" />,
          },
        })
      );

      try {
        await unsubscribePush({ silent: true });
        // await clearPersistCache()
      } catch (e) {
        console.error('Failed to unsubscribePush after logged out');
      }

      redirectToTarget();
    } catch (e) {
      window.dispatchEvent(
        new CustomEvent(ADD_TOAST, {
          detail: {
            color: 'red',
            content: <Translate id="failureLogout" />,
          },
        })
      );
    }
  };

  const menuItemSpacing = isInSideDrawerNav
    ? (['base', 'loose'] as [CardSpacing, CardSpacing])
    : undefined;
  const menuItemSize = isInSideDrawerNav ? 'xm' : 'md';

  return (
    <Menu spacingY={isInSideDrawerNav ? 0 : undefined}>
      <Menu.Item spacing={menuItemSpacing} {...PATHS.HELP}>
        <TextIcon
          icon={<Icon.HelpMedium size="md" />}
          spacing="base"
          size={menuItemSize}
        >
          <Translate id="helpCenter" />
        </TextIcon>
      </Menu.Item>

      <Menu.Item spacing={menuItemSpacing} {...PATHS.ME_SETTINGS_ACCOUNT}>
        <TextIcon
          icon={<Icon.SettingsMedium size="md" />}
          spacing="base"
          size={menuItemSize}
        >
          <Translate id="setting" />
        </TextIcon>
      </Menu.Item>

      <Menu.Item spacing={menuItemSpacing} onClick={onClickLogout}>
        <TextIcon
          icon={<Icon.LogoutMedium size="md" />}
          spacing="base"
          size={menuItemSize}
        >
          <Translate id="logout" />
        </TextIcon>
      </Menu.Item>
    </Menu>
  );
};

export default NavMenuBottom;
