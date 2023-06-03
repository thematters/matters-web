import Document, { Head, Html, Main, NextScript } from 'next/document'
// import { Noto_Sans_SC, Noto_Sans_TC } from 'next/font/google'
import Script from 'next/script'
import React from 'react'

import { CSP_POLICY } from '~/common/enums'

interface MattersDocumentProps {
  lang: HTMLLanguage
}

// const notoSansSC = Noto_Sans_SC({
//   weight: ['300', '400', '500', '700'],
//   style: ['normal'],
//   variable: '--font-noto-sans-sc',
//   subsets: ['latin'],
//   display: 'swap',
// })
// const notoSansTC = Noto_Sans_SC({
//   weight: ['300', '400', '500', '700'],
//   style: ['normal'],
//   variable: '--font-noto-sans-tc',
//   subsets: ['latin'],
//   display: 'swap',
// })

class MattersDocument extends Document<MattersDocumentProps> {
  public render() {
    return (
      <Html
      // className={`${notoSansSC.variable} ${notoSansTC.variable}`}
      >
        <Head>
          <meta httpEquiv="Content-Security-Policy" content={CSP_POLICY} />
        </Head>

        <body>
          <Main />
          <NextScript />

          <Script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5129054622209245"
            strategy="lazyOnload"
            crossOrigin="anonymous"
          />
        </body>
      </Html>
    )
  }
}

export default MattersDocument
