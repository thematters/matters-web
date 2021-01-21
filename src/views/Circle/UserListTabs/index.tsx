import { useRouter } from 'next/router'

import { Tabs, Translate } from '~/components'

import { PATHS } from '~/common/enums'
import { getQuery, toPath } from '~/common/utils'

const UserListTabs = () => {
  const router = useRouter()
  const name = getQuery({ router, key: 'name' }) || ''

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
      <Tabs.Tab
        {...circleMembersPath}
        selected={router.pathname === PATHS.CIRCLE_MEMBERS}
      >
        <Translate id="members" />
      </Tabs.Tab>

      <Tabs.Tab
        {...circleFollowersPath}
        selected={router.pathname === PATHS.CIRCLE_FOLLOWERS}
      >
        <Translate id="follower" />
      </Tabs.Tab>
    </Tabs>
  )
}

export default UserListTabs
