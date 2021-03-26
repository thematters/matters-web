import { useContext } from 'react'

import {
  CardSpacing,
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

import { PATHS } from '~/common/enums'
import { toPath } from '~/common/utils'

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
      <Menu.Item spacing={menuItemSpacing} {...viewerPath}>
        <TextIcon
          icon={<IconProfile24 size="md" />}
          spacing="base"
          size={menuItemSize}
        >
          <Translate id="myProfile" />
        </TextIcon>
      </Menu.Item>

      {circlePath && (
        <Menu.Item spacing={menuItemSpacing} href={circlePath.href}>
          <TextIcon
            icon={<IconCircle24 size="md" />}
            spacing="base"
            size={menuItemSize}
          >
            <Translate id="myCircle" />
          </TextIcon>
        </Menu.Item>
      )}

      <Menu.Item spacing={menuItemSpacing} href={PATHS.ME_DRAFTS}>
        <TextIcon
          icon={<IconDraft24 size="md" />}
          spacing="base"
          size={menuItemSize}
        >
          <Translate id="myDrafts" />
        </TextIcon>
      </Menu.Item>

      {(features.add_credit || features.payout) && (
        <Menu.Item spacing={menuItemSpacing} href={PATHS.ME_WALLET}>
          <TextIcon
            icon={<IconWallet24 size="md" />}
            spacing="base"
            size={menuItemSize}
          >
            <Translate id="myWallet" />
          </TextIcon>
        </Menu.Item>
      )}

      <Menu.Item spacing={menuItemSpacing} href={PATHS.ME_BOOKMARKS}>
        <TextIcon
          icon={<IconBookmark24 size="md" />}
          spacing="base"
          size={menuItemSize}
        >
          <Translate id="myBookmarks" />
        </TextIcon>
      </Menu.Item>

      <Menu.Item spacing={menuItemSpacing} href={PATHS.ME_APPRECIATIONS_SENT}>
        <TextIcon
          icon={<IconClap24 size="md" />}
          spacing="base"
          size={menuItemSize}
        >
          <Translate id="myAppreciations" />
        </TextIcon>
      </Menu.Item>

      <Menu.Item spacing={menuItemSpacing} href={PATHS.ME_HISTORY}>
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
