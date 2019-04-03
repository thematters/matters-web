import { Quill } from 'react-quill'

const BlockEmbed = Quill.import('blots/block/embed')
const Parchment = Quill.import('parchment')

class EmbedVideo extends BlockEmbed {
  static create(url: string) {
    const node = super.create()

    const figcaption = Parchment.create('figcaption', '').domNode

    const iframe = document.createElement('iframe')
    iframe.setAttribute('src', url)
    iframe.setAttribute('frameborder', '0')
    iframe.setAttribute('allowfullscreen', 'true')
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

EmbedVideo.blotName = 'embedVideo'
EmbedVideo.className = 'embed-video'
EmbedVideo.tagName = 'figure'

Quill.register('formats/embedVideo', EmbedVideo)

export default EmbedVideo
