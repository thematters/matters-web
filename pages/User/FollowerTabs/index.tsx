import Link from 'next/link'
import { withRouter, WithRouterProps } from 'next/router'
import { useContext } from 'react'

import { Tabs, Translate } from '~/components'
import { ViewerContext } from '~/components/Viewer'

import { PATHS } from '~/common/enums'
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
            <Translate zh_hant="返回" zh_hans="返回" />
          </a>
        </Link>
      </Tabs.Tab>
      <Tabs.Tab selected={pathname === PATHS.USER_FOLLOWERS.href}>
        <Link {...userFollowersPath}>
          <a>
            <Translate
              {...(isMe
                ? { zh_hant: '追蹤我的', zh_hans: '追踪我的' }
                : { zh_hant: '追蹤者', zh_hans: '追踪者' })}
            />
          </a>
        </Link>
      </Tabs.Tab>
      <Tabs.Tab selected={pathname === PATHS.USER_FOLLOWEES.href}>
        <Link {...userFolloweesPath}>
          <a>
            <Translate
              {...(isMe
                ? { zh_hant: '我追蹤的', zh_hans: '我追踪的' }
                : { zh_hant: '追蹤中', zh_hans: '追踪中' })}
            />
          </a>
        </Link>
      </Tabs.Tab>
    </Tabs>
  )
}

export default withRouter(MeTabs)
