import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import { toPath } from '~/common/utils'
import { Tabs, useRoute, ViewerContext } from '~/components'
import { TabsUserFragment } from '~/gql/graphql'

import { fragments } from './gql'

const UserTabs = ({
  user,
  loading,
}: {
  user?: TabsUserFragment
  loading?: boolean
}) => {
  const { isInPath, getQuery } = useRoute()
  const userName = getQuery('name')
  const viewer = useContext(ViewerContext)

  const userArticlesPath = toPath({
    page: 'userProfile',
    userName,
  })

  const userCollectionsPath = toPath({
    page: 'userCollections',
    userName,
  })

  const articleCount = user?.status?.articleCount || 0
  const collectionCount = user?.userCollections.totalCount || 0

  const isAuthor = viewer.userName === userName
  const showCollectionTab =
    loading ||
    (isAuthor ? articleCount > 0 || collectionCount > 0 : collectionCount > 0)

  return (
    <Tabs>
      <Tabs.Tab
        {...userArticlesPath}
        selected={isInPath('USER_ARTICLES')}
        count={articleCount > 0 ? articleCount : undefined}
      >
        <FormattedMessage defaultMessage="Articles" id="3KNMbJ" />
      </Tabs.Tab>

      {showCollectionTab && (
        <Tabs.Tab
          {...userCollectionsPath}
          selected={isInPath('USER_COLLECTIONS')}
          count={collectionCount > 0 ? collectionCount : undefined}
        >
          <FormattedMessage defaultMessage="Collections" id="ulh3kf" />
        </Tabs.Tab>
      )}
    </Tabs>
  )
}

UserTabs.fragments = fragments

export default UserTabs
