import { FormattedMessage } from 'react-intl'

import { toPath } from '~/common/utils'
import { SegmentedTabs, useRoute } from '~/components'

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
    <SegmentedTabs sticky>
      <SegmentedTabs.Tab
        {...userArticlesPath}
        selected={isInPath('USER_ARTICLES')}
      >
        <FormattedMessage defaultMessage="Articles" />
      </SegmentedTabs.Tab>

      <SegmentedTabs.Tab
        {...userCollectionsPath}
        selected={isInPath('USER_COLLECTIONS')}
      >
        <FormattedMessage defaultMessage="Collections" />
      </SegmentedTabs.Tab>
    </SegmentedTabs>
  )
}

export default UserTabs
