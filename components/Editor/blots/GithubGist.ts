import { Quill } from 'react-quill'

const BlockEmbed = Quill.import('blots/block/embed')
// CodeBlot
class GithubGistBlot extends BlockEmbed {
  public static create(url: string) {
    const node = super.create()

    const parent = document.getElementById('editor')
    if (parent) {
      let childLength = parent.querySelectorAll('.record').length
      const iframe = document.getElementById('frame') as HTMLIFrameElement

      if (iframe) {
        const iframeNew = iframe.cloneNode(true) as HTMLIFrameElement
        childLength += 1

        iframeNew.setAttribute('id', 'frame_' + childLength)
        iframeNew.setAttribute('width', '100%')
        iframeNew.setAttribute('height', '300px')
        iframeNew.setAttribute(
          'style',
          'border-style: solid; border-color: #eee'
        )

        node.appendChild(iframeNew)

        setTimeout(() => {
          if (typeof url !== 'string') {
            return
          }

          const frame = document.getElementById(
            'frame_' + childLength
          ) as HTMLIFrameElement

          if (frame) {
            const dom = document.all
              ? frame.contentWindow && frame.contentWindow.document
              : frame.contentDocument

            if (dom) {
              dom.open()
              if (frame.contentWindow) {
                frame.contentWindow.document.write(`
                        <!DOCTYPE html>
                        <html lang="en">
                        <head>
                        <title></title>
                        <meta charset="UTF-8">
                        <meta
                        name="viewport"
                        content="width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"
                        />
                        </head>

                        <body>
                        <script src="${url}.js"></script>
                        </body>
                        </html>`)
              }

              // ep: https://gist.github.com/sammieho1995/fac3bbb632d07551a9a51f1afc35b76e.js
              dom.close()
              // dom.contentEditable = true
              dom.designMode = 'on'
              frame.removeAttribute('hidden')
            }
          }
        }, 0)

        return node
      }
    }
  }

  public static value(node: any) {
    return node
  }
}
GithubGistBlot.blotName = 'gist'
GithubGistBlot.tagName = 'div'
GithubGistBlot.className = 'code-blot-wrapper'

export default GithubGistBlot
