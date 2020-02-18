import { useRouter } from 'next/router'
import { useContext } from 'react'

import { Tabs, Translate, ViewerContext } from '~/components'

import { PATHS, TEXT } from '~/common/enums'
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
          <Translate
            zh_hant={TEXT.zh_hant.article}
            zh_hans={TEXT.zh_hans.article}
          />
        </Tabs.Tab>

        <Tabs.Tab
          {...userDraftsPath}
          selected={router.pathname === PATHS.USER_DRAFTS.href}
        >
          <Translate
            zh_hant={TEXT.zh_hant.draft}
            zh_hans={TEXT.zh_hans.draft}
          />
        </Tabs.Tab>

        <Tabs.Tab
          {...userCommentsPath}
          selected={router.pathname === PATHS.USER_COMMENTS.href}
        >
          <Translate
            zh_hant={TEXT.zh_hant.comment}
            zh_hans={TEXT.zh_hans.comment}
          />
        </Tabs.Tab>

        <Tabs.Tab
          {...userBookmarksPath}
          selected={router.pathname === PATHS.USER_BOOKMARKS.href}
        >
          <Translate
            zh_hant={TEXT.zh_hant.bookmark}
            zh_hans={TEXT.zh_hans.bookmark}
          />
        </Tabs.Tab>

        <Tabs.Tab
          {...userHistoryPath}
          selected={router.pathname === PATHS.USER_HISTORY.href}
        >
          <Translate
            zh_hant={TEXT.zh_hant.history}
            zh_hans={TEXT.zh_hans.history}
          />
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
        <Translate
          zh_hant={TEXT.zh_hant.article}
          zh_hans={TEXT.zh_hans.article}
        />
      </Tabs.Tab>

      <Tabs.Tab
        {...userCommentsPath}
        selected={router.pathname === PATHS.USER_COMMENTS.href}
      >
        <Translate
          zh_hant={TEXT.zh_hant.comment}
          zh_hans={TEXT.zh_hans.comment}
        />
      </Tabs.Tab>
    </Tabs>
  )
}

export default MeTabs
