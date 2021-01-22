import { useContext } from 'react'

import { Tabs, Translate, useRoute, ViewerContext } from '~/components'

import { toPath } from '~/common/utils'

const MeTabs = () => {
  const { isInPath, getQuery } = useRoute()
  const viewer = useContext(ViewerContext)
  const userName = getQuery('name')
  const isMe = !userName || viewer.userName === userName

  const userFollowersPath = toPath({
    page: 'userFollowers',
    userName,
  })
  const userFolloweesPath = toPath({
    page: 'userFollowees',
    userName,
  })

  return (
    <Tabs sticky>
      <Tabs.Tab {...userFollowersPath} selected={isInPath('USER_FOLLOWERS')}>
        <Translate id={isMe ? 'followingMe' : 'follower'} />
      </Tabs.Tab>

      <Tabs.Tab {...userFolloweesPath} selected={isInPath('USER_FOLLOWEES')}>
        <Translate id={isMe ? 'myFollowees' : 'following'} />
      </Tabs.Tab>
    </Tabs>
  )
}

export default MeTabs
