import Link from 'next/link'
import { withRouter, WithRouterProps } from 'next/router'
import { useContext } from 'react'

import { Tabs, Translate } from '~/components'
import { ViewerContext } from '~/components/Viewer'

import { PATHS, TEXT } from '~/common/enums'
import { getQuery, toPath } from '~/common/utils'

const MeTabs: React.FC<WithRouterProps> = ({ router }) => {
  const viewer = useContext(ViewerContext)
  const pathname = router && router.pathname
  const userName = getQuery({ router, key: 'userName' }) || ''
  const isMe = !userName || viewer.userName === userName

  const userPath = toPath({
    page: 'userProfile',
    userName
  })
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
      <Tabs.Tab>
        <Link {...userPath}>
          <a>
            <Translate
              zh_hant={TEXT.zh_hant.back}
              zh_hans={TEXT.zh_hant.back}
            />
          </a>
        </Link>
      </Tabs.Tab>
      <Tabs.Tab selected={pathname === PATHS.USER_FOLLOWERS.href}>
        <Link {...userFollowersPath}>
          <a>
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
          </a>
        </Link>
      </Tabs.Tab>
      <Tabs.Tab selected={pathname === PATHS.USER_FOLLOWEES.href}>
        <Link {...userFolloweesPath}>
          <a>
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
          </a>
        </Link>
      </Tabs.Tab>
    </Tabs>
  )
}

export default withRouter(MeTabs)
