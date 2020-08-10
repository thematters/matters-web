import _get from 'lodash/get'
import Document, {
  DocumentContext,
  Head,
  Main,
  NextScript,
} from 'next/document'
import React from 'react'

import { GA_TRACKING_ID } from '~/common/enums'
import { langConvert } from '~/common/utils'

const FIREBASE_CONFIG = process.env.NEXT_PUBLIC_FIREBASE_CONFIG
  ? JSON.parse(
      Buffer.from(process.env.NEXT_PUBLIC_FIREBASE_CONFIG, 'base64').toString()
    )
  : {}

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
      <html lang={this.props.lang}>
        <Head>
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <script
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
          {/* Firebase */}
          <script src="https://www.gstatic.com/firebasejs/7.14.2/firebase-app.js" />
          <script src="https://www.gstatic.com/firebasejs/7.14.2/firebase-analytics.js" />
          <script
            async
            dangerouslySetInnerHTML={{
              __html: `
                firebase.initializeApp(${JSON.stringify(FIREBASE_CONFIG)});
                window.firebaseAnalytics = firebase.analytics();
              `,
            }}
          />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}

export default MattersDocument
