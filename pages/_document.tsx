import Document, {
  Head,
  Main,
  NextDocumentContext,
  NextScript
} from 'next/document'
import React from 'react'
import sprite from 'svg-sprite-loader/runtime/sprite.build'

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
        <Head />

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
