import { FormattedMessage } from 'react-intl'

import { toPath } from '~/common/utils'
import { Tabs, useRoute } from '~/components'

const UserTabs = () => {
  const { isInPath, getQuery } = useRoute()
  const userName = getQuery('name')

  const userArticlesPath = toPath({
    page: 'userProfile',
    userName,
  })

  const userCollectionsPath = toPath({
    page: 'userCollections',
    userName,
  })

  return (
    <Tabs>
      <Tabs.Tab {...userArticlesPath} selected={isInPath('USER_ARTICLES')}>
        <FormattedMessage defaultMessage="Articles" />
      </Tabs.Tab>

      <Tabs.Tab
        {...userCollectionsPath}
        selected={isInPath('USER_COLLECTIONS')}
      >
        <FormattedMessage defaultMessage="Collections" />
      </Tabs.Tab>
    </Tabs>
  )
}

export default UserTabs
