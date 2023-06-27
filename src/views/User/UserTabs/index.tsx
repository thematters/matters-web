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

  return (
    <Tabs sticky>
      <Tabs.Tab {...userArticlesPath} selected={isInPath('USER_ARTICLES')}>
        <FormattedMessage defaultMessage="Articles" description="" />
      </Tabs.Tab>
    </Tabs>
  )
}

export default UserTabs
