import { Quill } from 'react-quill'

const Parchment = Quill.import('parchment')
const BlockEmbed = Quill.import('blots/block/embed')

class ImageFigure extends BlockEmbed {
  static create(value: { src?: string; caption?: string }) {
    const node = super.create(value)

    const figcaption = Parchment.create('figcaption', value.caption || '')
      .domNode

    const image = document.createElement('img')
    image.setAttribute('src', value.src || '')

    node.appendChild(image)
    node.appendChild(figcaption)

    return node
  }

  static value(domNode: HTMLElement): any {
    const image = domNode.querySelector('img')
    const caption = domNode.querySelector('figcaption')

    return {
      src: image ? image.getAttribute('src') : '',
      caption: caption ? caption.innerText : ''
    }
  }
}

ImageFigure.blotName = 'imageFigure'
ImageFigure.className = 'image'
ImageFigure.tagName = 'figure'

Quill.register('formats/imageFigure', ImageFigure)

export default ImageFigure
