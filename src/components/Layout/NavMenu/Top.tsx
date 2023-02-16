import { useContext } from 'react'

import { PATHS } from '~/common/enums'
import { toPath } from '~/common/utils'
import {
  CardSpacing,
  IconAnalytics24,
  IconBookmark24,
  IconCircle24,
  IconClap24,
  IconDraft24,
  IconHistory24,
  IconProfile24,
  IconWallet24,
  Menu,
  TextIcon,
  Translate,
  useFeatures,
  ViewerContext,
} from '~/components'

interface NavMenuTopProps {
  isInSideDrawerNav?: boolean
}

const NavMenuTop: React.FC<NavMenuTopProps> = ({ isInSideDrawerNav }) => {
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

  const menuItemSpacing = isInSideDrawerNav
    ? (['base', 'loose'] as [CardSpacing, CardSpacing])
    : undefined
  const menuItemSize = isInSideDrawerNav ? 'xm' : 'md'

  return (
    <Menu spacingY={isInSideDrawerNav ? 0 : undefined}>
      <Menu.Item spacing={menuItemSpacing} {...viewerPath} is="link">
        <TextIcon
          icon={<IconProfile24 size="md" />}
          spacing="base"
          size={menuItemSize}
        >
          <Translate id="myProfile" />
        </TextIcon>
      </Menu.Item>
      {circlePath && (
        <Menu.Item spacing={menuItemSpacing} href={circlePath.href} is="link">
          <TextIcon
            icon={<IconCircle24 size="md" />}
            spacing="base"
            size={menuItemSize}
          >
            <Translate id="myCircle" />
          </TextIcon>
        </Menu.Item>
      )}
      <Menu.Item spacing={menuItemSpacing} href={PATHS.ME_DRAFTS} is="link">
        <TextIcon
          icon={<IconDraft24 size="md" />}
          spacing="base"
          size={menuItemSize}
        >
          <Translate id="myDrafts" />
        </TextIcon>
      </Menu.Item>
      {(features.add_credit || features.payout) && (
        <Menu.Item spacing={menuItemSpacing} href={PATHS.ME_WALLET} is="link">
          <TextIcon
            icon={<IconWallet24 size="md" />}
            spacing="base"
            size={menuItemSize}
          >
            <Translate id="myWallet" />
          </TextIcon>
        </Menu.Item>
      )}
      <Menu.Item spacing={menuItemSpacing} href={PATHS.ME_ANALYTICS} is="link">
        <TextIcon
          icon={<IconAnalytics24 size="md" />}
          spacing="base"
          size={menuItemSize}
        >
          <Translate id="myAnalytics" />
        </TextIcon>
      </Menu.Item>
      <Menu.Item spacing={menuItemSpacing} href={PATHS.ME_BOOKMARKS} is="link">
        <TextIcon
          icon={<IconBookmark24 size="md" />}
          spacing="base"
          size={menuItemSize}
        >
          <Translate id="myBookmarks" />
        </TextIcon>
      </Menu.Item>
      <Menu.Item spacing={menuItemSpacing} href={PATHS.ME_LIKES_SENT} is="link">
        <TextIcon
          icon={<IconClap24 size="md" />}
          spacing="base"
          size={menuItemSize}
        >
          <Translate id="myAppreciations" />
        </TextIcon>
      </Menu.Item>
      <Menu.Item spacing={menuItemSpacing} href={PATHS.ME_HISTORY} is="link">
        <TextIcon
          icon={<IconHistory24 size="md" />}
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
