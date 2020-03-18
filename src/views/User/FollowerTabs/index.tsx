import { useRouter } from 'next/router'
import { useContext } from 'react'

import { Tabs, Translate, ViewerContext } from '~/components'

import { PATHS } from '~/common/enums'
import { getQuery, toPath } from '~/common/utils'

const MeTabs = () => {
  const router = useRouter()
  const viewer = useContext(ViewerContext)
  const userName = getQuery({ router, key: 'userName' }) || ''
  const isMe = !userName || viewer.userName === userName

  const userFollowersPath = toPath({
    page: 'userFollowers',
    userName
  })
  const userFolloweesPath = toPath({
    page: 'userFollowees',
    userName
  })

  return (
    <Tabs spacingBottom={0}>
      <Tabs.Tab
        {...userFollowersPath}
        selected={router.pathname === PATHS.USER_FOLLOWERS.href}
      >
        <Translate id={isMe ? 'followingMe' : 'follower'} />
      </Tabs.Tab>

      <Tabs.Tab
        {...userFolloweesPath}
        selected={router.pathname === PATHS.USER_FOLLOWEES.href}
      >
        <Translate id={isMe ? 'myFollowees' : 'following'} />
      </Tabs.Tab>
    </Tabs>
  )
}

export default MeTabs
