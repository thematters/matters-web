import Head from 'next/head'
import Link from 'next/link'

import { GlobalHeader, Placeholder } from '~/components'

import { PATHS } from '~/common/enums'
import { toPath } from '~/common/utils'
import styles from './styles.css'

const TEST_ARTICLE_DETAIL_PATHS = toPath({
  page: 'articleDetail',
  userName: 'matty',
  slug: '2019-10-20',
  mediaHash: 'some-mediaHash'
})
console.log(TEST_ARTICLE_DETAIL_PATHS)

export const Layout: React.SFC = ({ children }) => (
  <>
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Matters</title>
      <meta
        name="description"
        content="一個自由、自主、永續的創作與公共討論空間"
      />
      <meta name="keywords" content="matters,matters.news,創作有價" />
      <link href="" rel="shortcut icon" />

      {/* social */}
      <meta property="og:site_name" content="Matters" />
      <meta property="og:url" content="" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="" />
      <meta property="og:description" content="" />
      <meta property="og:locale" content="zh_HK" />
      <meta property="og:locale:alternate" content="zh_HK" />
      <meta property="og:locale:alternate" content="zh_TW" />
      <meta property="og:locale:alternate" content="zh_CN" />
      <meta name="twitter:site" content="@initiumnews" />
      <meta name="twitter:url" content="" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content="Content Title" />
      <meta name="twitter:description" content="" />
      <meta name="twitter:image" content="" />
    </Head>

    <GlobalHeader />

    <div style={{ textAlign: 'center' }}>
      <div>{children}</div>
      <Link href={PATHS.HOMEPAGE.fs} as={PATHS.HOMEPAGE.url}>
        <a>Back</a>
      </Link>{' '}
      /{' '}
      <Link
        href={TEST_ARTICLE_DETAIL_PATHS.fs}
        as={TEST_ARTICLE_DETAIL_PATHS.url}
      >
        <a>Goto ArticleDetail</a>
      </Link>
    </div>

    <main className="l-row">
      <article className="l-col-4 l-col-md-5 l-col-lg-8">
        <Placeholder.MattersToday />
        <Placeholder.ArticleDigestList />
      </article>
      <aside className="l-col-4 l-col-md-3 l-col-lg-4">
        <Placeholder.Sidebar />
      </aside>
      <style jsx>{styles}</style>
    </main>
  </>
)
