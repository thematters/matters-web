import Link from 'next/link'
import { withRouter, WithRouterProps } from 'next/router'

import { Tabs, Translate } from '~/components'

import { PATHS } from '~/common/enums'
import { getQuery, toPath } from '~/common/utils'

const MeTabs: React.FC<WithRouterProps> = ({ router }) => {
  const pathname = router && router.pathname
  const userName = getQuery({ router, key: 'userName' }) || ''
  const userArticlePath = toPath({
    page: 'userProfile',
    userName
  })
  const userCommentPath = toPath({
    page: 'userComments',
    userName
  })

  return (
    <Tabs>
      <Tabs.Tab selected={pathname === PATHS.USER_ARTICLES.href}>
        <Link {...userArticlePath}>
          <a>
            <Translate zh_hant="文章" zh_hans="文章" />
          </a>
        </Link>
      </Tabs.Tab>
      <Tabs.Tab selected={pathname === PATHS.USER_COMMENTS.href}>
        <Link {...userCommentPath}>
          <a>
            <Translate zh_hant="評論" zh_hans="评论" />
          </a>
        </Link>
      </Tabs.Tab>
    </Tabs>
  )
}

export default withRouter(MeTabs)
