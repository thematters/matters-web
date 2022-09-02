import Document, { Head, Html, Main, NextScript } from 'next/document'
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
        </body>
      </Html>
    )
  }
}

export default MattersDocument
