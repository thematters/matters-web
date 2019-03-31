import { Quill } from 'react-quill'

const BlockEmbed = Quill.import('blots/block/embed')

class Video extends BlockEmbed {
  static create(url: string) {
    const node = super.create()
    const iframe = document.createElement('iframe')
    iframe.setAttribute('src', url)
    iframe.setAttribute('frameborder', '0')
    iframe.setAttribute('allowfullscreen', 'false')

    node.setAttribute('contenteditable', 'fasle')
    node.appendChild(iframe)
    return node
  }

  static value(node: HTMLElement) {
    const iframe = node.querySelector('iframe')
    return iframe ? iframe.getAttribute('src') : null
  }
}

Video.blotName = 'video'
Video.className = 'iframe-container'
Video.tagName = 'div'

Quill.register('formats/video', Video)

export default Video
