import { Quill } from 'react-quill'

const BlockEmbed = Quill.import('blots/block/embed')
const Parchment = Quill.import('parchment')

class EmbedCode extends BlockEmbed {
  static create({ url, caption }: { url: string; caption?: string }) {
    const node = super.create()

    const figcaption = Parchment.create('figcaption', caption).domNode

    const iframe = document.createElement('iframe')
    iframe.setAttribute('src', url)
    iframe.setAttribute('frameborder', '0')
    iframe.setAttribute('allowfullscreen', 'false')
    iframe.setAttribute(
      'sandbox',
      'allow-scripts allow-same-origin allow-popups'
    )

    const iframeContainer = document.createElement('div')
    iframeContainer.setAttribute('class', 'iframe-container')
    iframeContainer.appendChild(iframe)

    node.appendChild(iframeContainer)
    node.appendChild(figcaption)

    return node
  }

  static value(domNode: HTMLElement): any {
    const iframe = domNode.querySelector('iframe')
    const caption = domNode.querySelector('figcaption')

    return {
      url: iframe ? iframe.getAttribute('src') : '',
      caption: caption ? caption.innerText : ''
    }
  }
}

EmbedCode.blotName = 'embedCode'
EmbedCode.className = 'embed-code'
EmbedCode.tagName = 'figure'

Quill.register('formats/embedCode', EmbedCode)

export default EmbedCode
