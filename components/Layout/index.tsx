import gql from 'graphql-tag'
import Head from 'next/head'

import { AnalyticsListener } from '~/components/Analytics'
import { GlobalHeader } from '~/components/GlobalHeader'
import { ToastHolder } from '~/components/ToastHolder'
import { LayoutUser } from './__generated__/LayoutUser'

interface LayoutProps {
  loading: boolean
  user: LayoutUser
  error?: Error
}

const fragments = {
  user: gql`
    fragment LayoutUser on User {
      ...GlobalHeaderUser
      ...AnalyticsUser
    }
    ${GlobalHeader.fragments.user}
    ${AnalyticsListener.fragments.user}
  `
}

export const Layout: React.FC<LayoutProps> & {
  fragments: typeof fragments
} = ({ children, loading, user, error }) =>
  loading ? null : (
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

      <GlobalHeader user={user} />
      <ToastHolder />

      {children}
    </>
  )

Layout.fragments = fragments
