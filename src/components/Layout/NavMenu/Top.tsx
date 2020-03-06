import { useContext } from 'react'

import { Icon, Menu, TextIcon, Translate, ViewerContext } from '~/components'

import { PATHS } from '~/common/enums'
import { toPath } from '~/common/utils'

const NavMenuTop = () => {
  const viewer = useContext(ViewerContext)
  const viewerPath = toPath({
    page: 'userProfile',
    userName: viewer.userName || ''
  })
  const viewerDraftPath = toPath({
    page: 'userDrafts',
    userName: viewer.userName || ''
  })
  const viewerBookmarks = toPath({
    page: 'userBookmarks',
    userName: viewer.userName || ''
  })
  const viewerHistoryPath = toPath({
    page: 'userHistory',
    userName: viewer.userName || ''
  })

  return (
    <Menu>
      <Menu.Item {...viewerPath}>
        <TextIcon
          icon={<Icon.ProfileMedium size="md" />}
          spacing="base"
          size="md"
        >
          <Translate id="myProfile" />
        </TextIcon>
      </Menu.Item>

      <Menu.Item {...viewerDraftPath}>
        <TextIcon
          icon={<Icon.DraftMedium size="md" />}
          spacing="base"
          size="md"
        >
          <Translate id="myDrafts" />
        </TextIcon>
      </Menu.Item>

      <Menu.Item {...PATHS.ME_APPRECIATIONS_SENT}>
        <TextIcon icon={<Icon.LikeMedium size="md" />} spacing="base" size="md">
          <Translate id="myAppreciations" />
        </TextIcon>
      </Menu.Item>

      <Menu.Item {...viewerBookmarks}>
        <TextIcon
          icon={<Icon.BookmarkMedium size="md" />}
          spacing="base"
          size="md"
        >
          <Translate id="myBookmarks" />
        </TextIcon>
      </Menu.Item>

      <Menu.Item {...viewerHistoryPath}>
        <TextIcon
          icon={<Icon.HistoryMedium size="md" />}
          spacing="base"
          size="md"
        >
          <Translate id="readHistory" />
        </TextIcon>
      </Menu.Item>
    </Menu>
  )
}

export default NavMenuTop
