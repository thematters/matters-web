import Head from 'next/head'
import Link from 'next/link'

export const Layout: React.SFC = ({ children }) => (
  <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
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
        <a>[Back -]</a>
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
