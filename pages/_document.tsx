import getConfig from 'next/config'
import Document, {
  Head,
  Main,
  NextDocumentContext,
  NextScript
} from 'next/document'
import React from 'react'
import sprite from 'svg-sprite-loader/runtime/sprite.build'

const {
  publicRuntimeConfig: { GA_TRACKING_ID }
} = getConfig()

interface MattersDocumentProps {
  spriteContent: string
}

class MattersDocument extends Document<MattersDocumentProps> {
  public static async getInitialProps(ctx: NextDocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    const spriteContent = sprite.stringify()

    return {
      spriteContent,
      ...initialProps
    }
  }

  public render() {
    return (
      // TODO: lang
      <html lang="zh-hant">
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
