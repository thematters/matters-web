import Head from 'next/head'

export const Layout: React.SFC = ({ children }) => (
  <div>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
    </Head>
    <style jsx global>{`
      body {
        font: 32px menlo;
        color: #000;
      }
    `}</style>

    {children}
  </div>
)
