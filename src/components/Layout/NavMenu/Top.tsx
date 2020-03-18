import { useContext } from 'react'

import {
  CardSpacing,
  Icon,
  Menu,
  TextIcon,
  Translate,
  ViewerContext
} from '~/components'

import { PATHS } from '~/common/enums'
import { toPath } from '~/common/utils'

interface NavMenuTopProps {
  isInSideDrawerNav?: boolean
}

const NavMenuTop: React.FC<NavMenuTopProps> = ({ isInSideDrawerNav }) => {
  const viewer = useContext(ViewerContext)
  const viewerPath = toPath({
    page: 'userProfile',
    userName: viewer.userName || ''
  })

  const menuItemSpacing = isInSideDrawerNav
    ? (['base', 'loose'] as [CardSpacing, CardSpacing])
    : undefined
  const menuItemSize = isInSideDrawerNav ? 'xm' : 'md'

  return (
    <Menu spacingY={isInSideDrawerNav ? 0 : undefined}>
      <Menu.Item spacing={menuItemSpacing} {...viewerPath}>
        <TextIcon
          icon={<Icon.ProfileMedium size="md" />}
          spacing="base"
          size={menuItemSize}
        >
          <Translate id="myProfile" />
        </TextIcon>
      </Menu.Item>

      <Menu.Item spacing={menuItemSpacing} {...PATHS.ME_DRAFTS}>
        <TextIcon
          icon={<Icon.DraftMedium size="md" />}
          spacing="base"
          size={menuItemSize}
        >
          <Translate id="myDrafts" />
        </TextIcon>
      </Menu.Item>

      <Menu.Item spacing={menuItemSpacing} {...PATHS.ME_APPRECIATIONS_SENT}>
        <TextIcon
          icon={<Icon.LikeMedium size="md" />}
          spacing="base"
          size={menuItemSize}
        >
          <Translate id="myAppreciations" />
        </TextIcon>
      </Menu.Item>

      <Menu.Item spacing={menuItemSpacing} {...PATHS.ME_BOOKMARKS}>
        <TextIcon
          icon={<Icon.BookmarkMedium size="md" />}
          spacing="base"
          size={menuItemSize}
        >
          <Translate id="myBookmarks" />
        </TextIcon>
      </Menu.Item>

      <Menu.Item spacing={menuItemSpacing} {...PATHS.ME_HISTORY}>
        <TextIcon
          icon={<Icon.HistoryMedium size="md" />}
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
