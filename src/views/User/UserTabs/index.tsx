import { Tabs, Translate, useRoute } from '~/components'

import { numAbbr, toPath } from '~/common/utils'

type UserTabsProps = {
  articleCount: number
}

const UserTabs: React.FC<UserTabsProps> = ({ articleCount }) => {
  const { isInPath, getQuery } = useRoute()
  const userName = getQuery('name')

  const userArticlesPath = toPath({
    page: 'userProfile',
    userName,
  })

  return (
    <Tabs sticky>
      <Tabs.Tab
        {...userArticlesPath}
        selected={isInPath('USER_ARTICLES')}
        count={numAbbr(articleCount)}
        plain
      >
        <Translate zh_hant="所有作品" zh_hans="所有作品" en="All Articles" />
      </Tabs.Tab>
    </Tabs>
  )
}

export default UserTabs
