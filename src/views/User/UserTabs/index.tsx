import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import { analytics, toPath } from '~/common/utils'
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
  const momentCount = user?.status?.momentCount || 0
  const writingCount = articleCount + momentCount
  const collectionCount = user?.userCollections.totalCount || 0

  const isAuthor = viewer.userName === userName
  const showCollectionTab =
    loading ||
    (isAuthor ? writingCount > 0 || collectionCount > 0 : collectionCount > 0)

  return (
    <Tabs>
      <Tabs.Tab
        {...userArticlesPath}
        selected={isInPath('USER_WORKS')}
        count={writingCount > 0 ? writingCount : undefined}
      >
        <FormattedMessage defaultMessage="Works" id="6D7u/C" />
      </Tabs.Tab>

      {showCollectionTab && (
        <Tabs.Tab
          {...userCollectionsPath}
          selected={isInPath('USER_COLLECTIONS')}
          count={collectionCount > 0 ? collectionCount : undefined}
          onClick={() => {
            analytics.trackEvent('click_button', {
              type: `user_profile_tab_collection` as `user_profile_tab_${string}`,
              pageType: 'user_profile',
            })
          }}
        >
          <FormattedMessage defaultMessage="Collections" id="ulh3kf" />
        </Tabs.Tab>
      )}
    </Tabs>
  )
}

UserTabs.fragments = fragments

export default UserTabs
