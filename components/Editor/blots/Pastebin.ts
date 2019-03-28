import { Quill } from 'react-quill'

const BlockEmbed = Quill.import('blots/block/embed')

const iframeStyle =
  'position:absolute;top:0;left:0;right:0;bottom:0;width:100%;height:100%;'

const containerStyle = 'position:relative;width:100%;height:0;padding-top:55%;'

class Pastebin extends BlockEmbed {
  public static create(url: string) {
    const node = super.create()
    const iframe = document.createElement('iframe')
    iframe.setAttribute('src', url)
    iframe.setAttribute('frameborder', '0')
    iframe.setAttribute('allowfullscreen', 'false')
    iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin')
    iframe.setAttribute('style', iframeStyle)
    node.setAttribute('style', containerStyle)
    node.appendChild(iframe)
    return node
  }

  public static value(node: HTMLElement) {
    return node.getAttribute('src')
  }
}

Pastebin.blotName = 'pastebin'
Pastebin.className = 'iframe-container'
Pastebin.tagName = 'div'

Quill.register('formats/pastebin', Pastebin)

export default Pastebin
