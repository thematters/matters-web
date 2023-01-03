import Document, { Head, Html, Main, NextScript } from 'next/document'
import Script from 'next/script'
import React from 'react'

import { CSP_POLICY } from '~/common/enums'

interface MattersDocumentProps {
  lang: HTMLLanguage
}

class MattersDocument extends Document<MattersDocumentProps> {
  public render() {
    return (
      <Html>
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
