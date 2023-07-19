import { FormattedMessage } from 'react-intl'

import { toPath } from '~/common/utils'
import { Tabs, useRoute } from '~/components'
import { TabsUserFragment } from '~/gql/graphql'

import { fragments } from './gql'

const UserTabs = ({ user }: { user?: TabsUserFragment }) => {
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
      <Tabs.Tab
        {...userArticlesPath}
        selected={isInPath('USER_ARTICLES')}
        count={user?.tabsArticles.totalCount}
      >
        <FormattedMessage defaultMessage="Articles" />
      </Tabs.Tab>

      <Tabs.Tab
        {...userCollectionsPath}
        selected={isInPath('USER_COLLECTIONS')}
        count={user?.tabsCollections.totalCount}
      >
        <FormattedMessage defaultMessage="Collections" />
      </Tabs.Tab>
    </Tabs>
  )
}

UserTabs.fragments = fragments

export default UserTabs
