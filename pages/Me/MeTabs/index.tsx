import Link from 'next/link'
import { withRouter, WithRouterProps } from 'next/router'

import { Tabs, Translate } from '~/components'

import { PATHS } from '~/common/enums'

import styles from './styles.css'

const MeTabs: React.FC<WithRouterProps> = ({ router }) => {
  const asPath = router && router.asPath

  return (
    <section>
      <Tabs>
        <Tabs.Tab selected={asPath === PATHS.ME_ARTICLES.as}>
          <Link {...PATHS.ME_ARTICLES}>
            <a>
              <Translate zh_hant="我的文章" zh_hans="我的文章" />
            </a>
          </Link>
        </Tabs.Tab>
        <Tabs.Tab selected={asPath === PATHS.ME_DRAFTS.as}>
          <Link {...PATHS.ME_DRAFTS}>
            <a>
              <Translate zh_hant="我的草稿" zh_hans="我的草稿" />
            </a>
          </Link>
        </Tabs.Tab>
        <Tabs.Tab selected={asPath === PATHS.ME_COMMENTS.as}>
          <Link {...PATHS.ME_COMMENTS}>
            <a>
              <Translate zh_hant="我的評論" zh_hans="我的评论" />
            </a>
          </Link>
        </Tabs.Tab>
        <Tabs.Tab selected={asPath === PATHS.ME_BOOKMARKS.as}>
          <Link {...PATHS.ME_BOOKMARKS}>
            <a>
              <Translate zh_hant="我的收藏" zh_hans="我的收藏" />
            </a>
          </Link>
        </Tabs.Tab>
        <Tabs.Tab selected={asPath === PATHS.ME_HISTORY.as}>
          <Link {...PATHS.ME_HISTORY}>
            <a>
              <Translate zh_hant="瀏覽記錄" zh_hans="浏览记录" />
            </a>
          </Link>
        </Tabs.Tab>
      </Tabs>

      <style jsx>{styles}</style>
    </section>
  )
}

export default withRouter(MeTabs)
