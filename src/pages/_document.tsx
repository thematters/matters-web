import _get from 'lodash/get'
import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document'
import React from 'react'

import { toLocale } from '~/common/utils'

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
        if (property === 'og:locale' && content) {
          lang = toLocale(content) as HTMLLanguage
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
        <Head />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4792129775270382"
          crossOrigin="anonymous"
        ></script>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MattersDocument
