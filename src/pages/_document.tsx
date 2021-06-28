import _get from 'lodash/get'
import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document'
import Script from 'next/script'
import React from 'react'

import { CSP_POLICY, GA_TRACKING_ID } from '~/common/enums'
import { langConvert } from '~/common/utils'

interface MattersDocumentProps {
  lang: HTMLLanguage
}

class MattersDocument extends Document<MattersDocumentProps> {
  public static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    const heads = initialProps.head

    let lang: HTMLLanguage = 'zh-Hant'
    if (heads) {
      heads.every((head) => {
        const property = _get(head, 'props.property')
        const content = _get(head, 'props.content')
        if (property === 'og:locale') {
          lang = langConvert.og2html(content)
          return false
        }
        return true
      })
    }

    return {
      lang,
      ...initialProps,
    }
  }

  public render() {
    return (
      <Html lang={this.props.lang}>
        <Head>
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <Script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_TRACKING_ID}');
              `,
            }}
          />
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
