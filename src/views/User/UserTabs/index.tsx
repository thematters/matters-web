import { Tabs, Translate, useRoute } from '~/components'

import { toPath } from '~/common/utils'

const UserTabs: React.FC = () => {
  const { isInPath, getQuery } = useRoute()
  const userName = getQuery('name')

  const userArticlesPath = toPath({
    page: 'userProfile',
    userName,
  })

  return (
    <Tabs sticky>
      <Tabs.Tab {...userArticlesPath} selected={isInPath('USER_ARTICLES')}>
        <Translate id="article" />
      </Tabs.Tab>
    </Tabs>
  )
}

export default UserTabs
