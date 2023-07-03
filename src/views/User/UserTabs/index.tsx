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

  return (
    <SegmentedTabs sticky>
      <SegmentedTabs.Tab
        {...userArticlesPath}
        selected={isInPath('USER_ARTICLES')}
      >
        <FormattedMessage defaultMessage="Articles" description="" />
      </SegmentedTabs.Tab>
    </SegmentedTabs>
  )
}

export default UserTabs
