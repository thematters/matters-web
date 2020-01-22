import { useRouter } from 'next/router'
import { useContext } from 'react'

import { Tabs, Translate } from '~/components'
import { ViewerContext } from '~/components/Viewer'

import { PATHS, TEXT } from '~/common/enums'
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
    <Tabs>
      <Tabs.Tab
        {...userFollowersPath}
        selected={router.pathname === PATHS.USER_FOLLOWERS.href}
      >
        <Translate
          {...(isMe
            ? {
                zh_hant: TEXT.zh_hant.followingMe,
                zh_hans: TEXT.zh_hans.followingMe
              }
            : {
                zh_hant: TEXT.zh_hant.follower,
                zh_hans: TEXT.zh_hans.follower
              })}
        />
      </Tabs.Tab>

      <Tabs.Tab
        {...userFolloweesPath}
        selected={router.pathname === PATHS.USER_FOLLOWEES.href}
      >
        <Translate
          {...(isMe
            ? {
                zh_hant: TEXT.zh_hant.myFollowees,
                zh_hans: TEXT.zh_hans.myFollowees
              }
            : {
                zh_hant: TEXT.zh_hant.following,
                zh_hans: TEXT.zh_hans.following
              })}
        />
      </Tabs.Tab>
    </Tabs>
  )
}

export default MeTabs
