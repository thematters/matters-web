import { Quill } from 'react-quill'

const BlockEmbed = Quill.import('blots/block/embed')

class VideoBlot extends BlockEmbed {
  public static create(url: string) {
    const node = super.create()
    const editor = document.querySelector('div.quill')
    node.setAttribute('src', url)
    node.setAttribute('frameborder', '0')
    node.setAttribute('allowfullscreen', false)
    node.setAttribute('width', '100%')
    if (editor && editor.clientWidth) {
      node.setAttribute('height', `${editor.clientWidth * 0.55}px`)
    }
    return node
  }

  public static formats(node: HTMLElement) {
    let format = {}
    if (node.hasAttribute('height')) {
      format = { height: node.getAttribute('height') }
    }
    if (node.hasAttribute('width')) {
      format = { width: node.getAttribute('width'), ...format }
    }
    return format
  }

  public static value(node: HTMLElement) {
    return node.getAttribute('src')
  }

  public format(name: string, value: any) {
    if (name === 'height' || name === 'width') {
      if (value) {
        this.domNode.setAttribute(name, value)
      } else {
        this.domNode.removeAttribute(name, value)
      }
    } else {
      super.format(name, value)
    }
  }
}

VideoBlot.blotName = 'video'
VideoBlot.tagName = 'iframe'

export default VideoBlot
