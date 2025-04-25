import _get from 'lodash/get'
import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document'
import React from 'react'

import { CSP_POLICY } from '~/common/enums'
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
        <Head>
          {/* <meta httpEquiv="Content-Security-Policy" content={CSP_POLICY} /> */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
              window.gnshbrequest = window.gnshbrequest || {cmd:[]};
              window.gnshbrequest.cmd.push(function(){
                window.gnshbrequest.forceInternalRequest();
              });
            `,
            }}
          />
          <script
            async
            src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"
            onLoad={() => {
              console.log(
                'https://securepubads.g.doubleclick.net/tag/js/gpt.js has loaded'
              )
            }}
          />
          <script
            async
            src="https://cpt.geniee.jp/hb/v1/222058/2731/wrapper.min.js"
          />
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
