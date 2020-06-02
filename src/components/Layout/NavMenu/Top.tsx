import { useContext } from 'react'

import {
  CardSpacing,
  FeaturesContext,
  IconBookmarkMedium,
  IconDraftMedium,
  IconHistoryMedium,
  IconLikeMedium,
  IconProfileMedium,
  IconWalletMedium,
  Menu,
  TextIcon,
  Translate,
  ViewerContext,
} from '~/components'

import { PATHS } from '~/common/enums'
import { toPath } from '~/common/utils'

interface NavMenuTopProps {
  isInSideDrawerNav?: boolean
}

const NavMenuTop: React.FC<NavMenuTopProps> = ({ isInSideDrawerNav }) => {
  const viewer = useContext(ViewerContext)
  const features = useContext(FeaturesContext)
  const viewerPath = toPath({
    page: 'userProfile',
    userName: viewer.userName || '',
  })

  const menuItemSpacing = isInSideDrawerNav
    ? (['base', 'loose'] as [CardSpacing, CardSpacing])
    : undefined
  const menuItemSize = isInSideDrawerNav ? 'xm' : 'md'

  return (
    <Menu spacingY={isInSideDrawerNav ? 0 : undefined}>
      <Menu.Item spacing={menuItemSpacing} {...viewerPath}>
        <TextIcon
          icon={<IconProfileMedium size="md" />}
          spacing="base"
          size={menuItemSize}
        >
          <Translate id="myProfile" />
        </TextIcon>
      </Menu.Item>

      <Menu.Item spacing={menuItemSpacing} href={PATHS.ME_DRAFTS}>
        <TextIcon
          icon={<IconDraftMedium size="md" />}
          spacing="base"
          size={menuItemSize}
        >
          <Translate id="myDrafts" />
        </TextIcon>
      </Menu.Item>

      {(features.add_credit || features.payout) && (
        <Menu.Item spacing={menuItemSpacing} href={PATHS.ME_WALLET}>
          <TextIcon
            icon={<IconWalletMedium size="md" />}
            spacing="base"
            size={menuItemSize}
          >
            <Translate id="myWallet" />
          </TextIcon>
        </Menu.Item>
      )}

      <Menu.Item spacing={menuItemSpacing} href={PATHS.ME_BOOKMARKS}>
        <TextIcon
          icon={<IconBookmarkMedium size="md" />}
          spacing="base"
          size={menuItemSize}
        >
          <Translate id="myBookmarks" />
        </TextIcon>
      </Menu.Item>

      <Menu.Item spacing={menuItemSpacing} href={PATHS.ME_APPRECIATIONS_SENT}>
        <TextIcon
          icon={<IconLikeMedium size="md" />}
          spacing="base"
          size={menuItemSize}
        >
          <Translate id="myAppreciations" />
        </TextIcon>
      </Menu.Item>

      <Menu.Item spacing={menuItemSpacing} href={PATHS.ME_HISTORY}>
        <TextIcon
          icon={<IconHistoryMedium size="md" />}
          spacing="base"
          size={menuItemSize}
        >
          <Translate id="readHistory" />
        </TextIcon>
      </Menu.Item>
    </Menu>
  )
}

export default NavMenuTop
