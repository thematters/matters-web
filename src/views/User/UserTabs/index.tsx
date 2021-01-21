import { useRouter } from 'next/router'

import { Tabs, Translate } from '~/components'

import { PATHS } from '~/common/enums'
import { getQuery, toPath } from '~/common/utils'

type UserTabsProps = {
  hasSubscriptions?: boolean
}

const UserTabs: React.FC<UserTabsProps> = ({ hasSubscriptions }) => {
  const router = useRouter()
  const userName = getQuery({ router, key: 'name' }) || ''

  const userSubscriptonsPath = toPath({
    page: 'userSubscriptons',
    userName,
  })
  const userArticlesPath = toPath({
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
      {hasSubscriptions && (
        <Tabs.Tab
          {...userSubscriptonsPath}
          selected={router.pathname === PATHS.USER_SUBSCRIPTIONS}
        >
          <Translate id="subscriptions" />
        </Tabs.Tab>
      )}

      <Tabs.Tab
        {...userArticlesPath}
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

export default UserTabs
