import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext } from 'react'

import { Tabs, Translate } from '~/components'
import { ViewerContext } from '~/components/Viewer'

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
        <Tabs.Tab selected={router.pathname === PATHS.USER_ARTICLES.href}>
          <Link {...userArticlePath}>
            <a>
              <Translate
                zh_hant={TEXT.zh_hant.myArticles}
                zh_hans={TEXT.zh_hans.myArticles}
              />
            </a>
          </Link>
        </Tabs.Tab>
        <Tabs.Tab selected={router.pathname === PATHS.USER_DRAFTS.href}>
          <Link {...userDraftsPath}>
            <a>
              <Translate
                zh_hant={TEXT.zh_hant.myDrafts}
                zh_hans={TEXT.zh_hans.myDrafts}
              />
            </a>
          </Link>
        </Tabs.Tab>
        <Tabs.Tab selected={router.pathname === PATHS.USER_COMMENTS.href}>
          <Link {...userCommentsPath}>
            <a>
              <Translate
                zh_hant={TEXT.zh_hant.myComments}
                zh_hans={TEXT.zh_hans.myComments}
              />
            </a>
          </Link>
        </Tabs.Tab>
        <Tabs.Tab selected={router.pathname === PATHS.USER_BOOKMARKS.href}>
          <Link {...userBookmarksPath}>
            <a>
              <Translate
                zh_hant={TEXT.zh_hant.myBookmarks}
                zh_hans={TEXT.zh_hans.myBookmarks}
              />
            </a>
          </Link>
        </Tabs.Tab>
        <Tabs.Tab selected={router.pathname === PATHS.USER_HISTORY.href}>
          <Link {...userHistoryPath}>
            <a>
              <Translate
                zh_hant={TEXT.zh_hant.readHistory}
                zh_hans={TEXT.zh_hans.readHistory}
              />
            </a>
          </Link>
        </Tabs.Tab>
      </Tabs>
    )
  }

  return (
    <Tabs>
      <Tabs.Tab selected={router.pathname === PATHS.USER_ARTICLES.href}>
        <Link {...userArticlePath}>
          <a>
            <Translate
              zh_hant={TEXT.zh_hant.article}
              zh_hans={TEXT.zh_hans.article}
            />
          </a>
        </Link>
      </Tabs.Tab>
      <Tabs.Tab selected={router.pathname === PATHS.USER_COMMENTS.href}>
        <Link {...userCommentsPath}>
          <a>
            <Translate
              zh_hant={TEXT.zh_hant.comment}
              zh_hans={TEXT.zh_hans.comment}
            />
          </a>
        </Link>
      </Tabs.Tab>
    </Tabs>
  )
}

export default MeTabs
