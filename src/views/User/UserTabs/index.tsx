import { useRouter } from 'next/router'

import { Tabs, Translate } from '~/components'

import { PATHS } from '~/common/enums'
import { getQuery, toPath } from '~/common/utils'

const MeTabs = () => {
  const router = useRouter()
  const userName = getQuery({ router, key: 'userName' }) || ''

  const userArticlePath = toPath({
    page: 'userProfile',
    userName,
  })
  const userCommentsPath = toPath({
    page: 'userComments',
    userName,
  })
  const userTagsPath = toPath({
    page: 'userTags',
    userName,
  })

  return (
    <Tabs sticky>
      <Tabs.Tab
        {...userArticlePath}
        selected={router.pathname === PATHS.USER_ARTICLES}
      >
        <Translate id="article" />
      </Tabs.Tab>

      <Tabs.Tab
        {...userCommentsPath}
        selected={router.pathname === PATHS.USER_COMMENTS}
      >
        <Translate id="comment" />
      </Tabs.Tab>

      <Tabs.Tab
        {...userTagsPath}
        selected={router.pathname === PATHS.USER_TAGS}
      >
        <Translate id="tag" />
      </Tabs.Tab>
    </Tabs>
  )
}

export default MeTabs
