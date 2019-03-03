import Link from 'next/link'
import { withRouter, WithRouterProps } from 'next/router'
import { useContext } from 'react'

import { Translate } from '~/components/Language'
import { Tabs } from '~/components/Tabs'
import { ViewerContext } from '~/components/Viewer'

import { PATHS } from '~/common/enums'
import { getQuery, toPath } from '~/common/utils'

const MeTabs: React.FC<WithRouterProps> = ({ router }) => {
  const viewer = useContext(ViewerContext)
  const pathname = router && router.pathname
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
        <Tabs.Tab selected={pathname === PATHS.USER_ARTICLES.href}>
          <Link {...userArticlePath}>
            <a>
              <Translate zh_hant="我的文章" zh_hans="我的文章" />
            </a>
          </Link>
        </Tabs.Tab>
        <Tabs.Tab selected={pathname === PATHS.USER_DRAFTS.href}>
          <Link {...userDraftsPath}>
            <a>
              <Translate zh_hant="我的草稿" zh_hans="我的草稿" />
            </a>
          </Link>
        </Tabs.Tab>
        <Tabs.Tab selected={pathname === PATHS.USER_COMMENTS.href}>
          <Link {...userCommentsPath}>
            <a>
              <Translate zh_hant="我的評論" zh_hans="我的评论" />
            </a>
          </Link>
        </Tabs.Tab>
        <Tabs.Tab selected={pathname === PATHS.USER_BOOKMARKS.href}>
          <Link {...userBookmarksPath}>
            <a>
              <Translate zh_hant="我的收藏" zh_hans="我的收藏" />
            </a>
          </Link>
        </Tabs.Tab>
        <Tabs.Tab selected={pathname === PATHS.USER_HISTORY.href}>
          <Link {...userHistoryPath}>
            <a>
              <Translate zh_hant="瀏覽記錄" zh_hans="浏览记录" />
            </a>
          </Link>
        </Tabs.Tab>
      </Tabs>
    )
  }

  return (
    <Tabs>
      <Tabs.Tab selected={pathname === PATHS.USER_ARTICLES.href}>
        <Link {...userArticlePath}>
          <a>
            <Translate zh_hant="文章" zh_hans="文章" />
          </a>
        </Link>
      </Tabs.Tab>
      <Tabs.Tab selected={pathname === PATHS.USER_COMMENTS.href}>
        <Link {...userCommentsPath}>
          <a>
            <Translate zh_hant="評論" zh_hans="评论" />
          </a>
        </Link>
      </Tabs.Tab>
    </Tabs>
  )
}

export default withRouter(MeTabs)
