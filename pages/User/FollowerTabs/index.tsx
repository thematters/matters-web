import Link from 'next/link'
import { withRouter, WithRouterProps } from 'next/router'

import { Tabs, Translate } from '~/components'

import { PATHS } from '~/common/enums'
import { getQuery, toPath } from '~/common/utils'

const MeTabs: React.FC<WithRouterProps> = ({ router }) => {
  const pathname = router && router.pathname
  const userName = getQuery({ router, key: 'userName' }) || ''
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

  console.log(pathname)

  return (
    <Tabs>
      <Tabs.Tab selected={pathname === PATHS.USER_ARTICLES.href}>
        <Link {...userPath}>
          <a>
            <Translate zh_hant="返回" zh_hans="返回" />
          </a>
        </Link>
      </Tabs.Tab>
      <Tabs.Tab selected={pathname === PATHS.USER_FOLLOWERS.href}>
        <Link {...userFollowersPath}>
          <a>
            <Translate zh_hant="追蹤者" zh_hans="追踪者" />
          </a>
        </Link>
      </Tabs.Tab>
      <Tabs.Tab selected={pathname === PATHS.USER_FOLLOWEES.href}>
        <Link {...userFolloweesPath}>
          <a>
            <Translate zh_hant="追蹤中" zh_hans="追踪中" />
          </a>
        </Link>
      </Tabs.Tab>
    </Tabs>
  )
}

export default withRouter(MeTabs)
