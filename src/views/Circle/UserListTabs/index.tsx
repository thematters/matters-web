import { Tabs, Translate, useRoute } from '~/components'

import { toPath } from '~/common/utils'

const UserListTabs = () => {
  const { isInPath, getQuery } = useRoute()
  const name = getQuery('name')

  const circleMembersPath = toPath({
    page: 'circleMembers',
    circle: { name },
  })

  const circleFollowersPath = toPath({
    page: 'circleFollowers',
    circle: { name },
  })

  return (
    <Tabs sticky>
      <Tabs.Tab {...circleMembersPath} selected={isInPath('CIRCLE_MEMBERS')}>
        <Translate id="members" />
      </Tabs.Tab>

      <Tabs.Tab
        {...circleFollowersPath}
        selected={isInPath('CIRCLE_FOLLOWERS')}
      >
        <Translate id="follower" />
      </Tabs.Tab>
    </Tabs>
  )
}

export default UserListTabs
