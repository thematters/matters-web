import { useRouter } from 'next/router'
import { useContext } from 'react'

import { Tabs, Translate, ViewerContext } from '~/components'

import { PATHS } from '~/common/enums'
import { getQuery, toPath } from '~/common/utils'

const MeTabs = () => {
  const router = useRouter()
  const viewer = useContext(ViewerContext)
  const userName = getQuery({ router, key: 'userName' }) || ''
  const isMe = viewer.userName === userName

  const userArticlePath = toPath({
    page: 'userProfile',
    userName
  })
  const userCommentsPath = toPath({
    page: 'userComments',
    userName
  })
  const userDraftsPath = toPath({
    page: 'userDrafts',
    userName
  })
  const userBookmarksPath = toPath({
    page: 'userBookmarks',
    userName
  })
  const userHistoryPath = toPath({
    page: 'userHistory',
    userName
  })

  if (isMe) {
    return (
      <Tabs>
        <Tabs.Tab
          {...userArticlePath}
          selected={router.pathname === PATHS.USER_ARTICLES.href}
        >
          <Translate id="article" />
        </Tabs.Tab>

        <Tabs.Tab
          {...userDraftsPath}
          selected={router.pathname === PATHS.USER_DRAFTS.href}
        >
          <Translate id="draft" />
        </Tabs.Tab>

        <Tabs.Tab
          {...userCommentsPath}
          selected={router.pathname === PATHS.USER_COMMENTS.href}
        >
          <Translate id="comment" />
        </Tabs.Tab>

        <Tabs.Tab
          {...userBookmarksPath}
          selected={router.pathname === PATHS.USER_BOOKMARKS.href}
        >
          <Translate id="bookmark" />
        </Tabs.Tab>

        <Tabs.Tab
          {...userHistoryPath}
          selected={router.pathname === PATHS.USER_HISTORY.href}
        >
          <Translate id="history" />
        </Tabs.Tab>
      </Tabs>
    )
  }

  return (
    <Tabs>
      <Tabs.Tab
        {...userArticlePath}
        selected={router.pathname === PATHS.USER_ARTICLES.href}
      >
        <Translate id="article" />
      </Tabs.Tab>

      <Tabs.Tab
        {...userCommentsPath}
        selected={router.pathname === PATHS.USER_COMMENTS.href}
      >
        <Translate id="comment" />
      </Tabs.Tab>
    </Tabs>
  )
}

export default MeTabs
