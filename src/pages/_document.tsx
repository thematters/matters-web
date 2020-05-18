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
          {/* segment.io */}
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `
              !function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on"];analytics.factory=function(t){return function(){var e=Array.prototype.slice.call(arguments);e.unshift(t);analytics.push(e);return analytics}};for(var t=0;t<analytics.methods.length;t++){var e=analytics.methods[t];analytics[e]=analytics.factory(e)}analytics.load=function(t,e){var n=document.createElement("script");n.type="text/javascript";n.async=!0;n.src="https://cdn.segment.com/analytics.js/v1/"+t+"/analytics.min.js";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(n,a);analytics._loadOptions=e};analytics.SNIPPET_VERSION="4.1.0";
              analytics.load("${process.env.NEXT_PUBLIC_SEGMENT_KEY}");
              }}();
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
