import { Quill } from 'react-quill'

const BlockEmbed = Quill.import('blots/block/embed')
const Parchment = Quill.import('parchment')

class EmbedCode extends BlockEmbed {
  static create(url: string) {
    const node = super.create()

    const figcaption = Parchment.create('figcaption', '').domNode

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

    node.setAttribute('contenteditable', 'fasle')
    node.appendChild(iframeContainer)
    node.appendChild(figcaption)

    return node
  }

  static value(node: HTMLElement) {
    const iframe = node.querySelector('iframe')
    return iframe ? iframe.getAttribute('src') : null
  }
}

EmbedCode.blotName = 'embedCode'
EmbedCode.className = 'embed-code'
EmbedCode.tagName = 'figure'

Quill.register('formats/embedCode', EmbedCode)

export default EmbedCode
