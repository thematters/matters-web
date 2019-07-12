import _get from 'lodash/get'
import Document, {
  DocumentContext,
  Head,
  Main,
  NextScript
} from 'next/document'
import React from 'react'
import sprite from 'svg-sprite-loader/runtime/sprite.build'

import { GA_TRACKING_ID } from '~/common/enums'
import { langConvert } from '~/common/utils'

interface MattersDocumentProps {
  spriteContent: string
  lang: HTMLLanguage
}

class MattersDocument extends Document<MattersDocumentProps> {
  public static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    const spriteContent = sprite.stringify()
    const heads = initialProps.head as any[]

    let lang: HTMLLanguage = 'zh-Hant'
    if (heads) {
      heads.every(head => {
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
      spriteContent,
      ...initialProps
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
              `
            }}
          />
        </Head>

        <body>
          <div dangerouslySetInnerHTML={{ __html: this.props.spriteContent }} />
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}

export default MattersDocument
