import Head from 'next/head'
import Link from 'next/link'

import IconLogo from '~/static/icons/logo.svg?sprite'

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

    <header
      // TODO: remove styles
      style={{
        background: 'green',
        color: '#fff',
        padding: 20,
        marginBottom: 40,
        textAlign: 'center'
      }}
    >
      <Link href="/" as="/">
        <a>
          <IconLogo height={20} />
        </a>
      </Link>{' '}
      {children}{' '}
      <Link href="/Misc/About" as="/about">
        <a>[- About]</a>
      </Link>
    </header>
    <main className="l-row">
      <article
        className="l-col-4  l-col-md-5 l-col-lg-8"
        // TODO: remove styles
        style={{
          background: 'grey',
          color: '#fff',
          padding: 40,
          textAlign: 'center'
        }}
      >
        Left
      </article>
      <aside
        className="l-col-4  l-col-md-3 l-col-lg-4"
        // TODO: remove styles
        style={{
          background: 'black',
          color: '#fff',
          padding: 40,
          textAlign: 'center'
        }}
      >
        Right
      </aside>
    </main>

    <section
      className="l-row--full" // TODO: remove styles
      style={{
        background: '#774444',
        color: '#fff',
        padding: 40,
        marginTop: 40,
        textAlign: 'center'
      }}
    >
      <span
        className="l-offset-1 l-col-3 l-offset-sm-3 l-col-sm-2 l-offset-lg-4 l-col-lg-8"
        style={{ background: '#bd8585', padding: 20 }}
      >
        Full Width Row
      </span>
    </section>
  </>
)
