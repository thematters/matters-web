import { Quill } from 'react-quill'

const Parchment = Quill.import('parchment')
const BlockEmbed = Quill.import('blots/block/embed')

// ref: https://github.com/quilljs/quill/blob/develop/formats/image.js
class ImageFigure extends BlockEmbed {
  public static create(value: {
    src?: string
    caption?: string
    id?: string
    assetId?: string
  }) {
    const node = super.create(value)

    const figcaption = Parchment.create('figcaption', value.caption || '')
      .domNode

    const image = document.createElement('img')
    image.setAttribute('src', value.src || '')

    if (value.id) {
      image.setAttribute('id', value.id)
    }

    if (value.assetId) {
      image.dataset.assetId = value.assetId
    }

    node.appendChild(image)
    node.appendChild(figcaption)

    return node
  }

  static value(domNode: HTMLElement): any {
    const image = domNode.querySelector('img')
    const caption = domNode.querySelector('figcaption')

    return {
      src: image ? image.getAttribute('src') : '',
      caption: caption ? caption.innerText : '',
      assetId: image ? image.dataset.assetId : undefined
    }
  }
}

ImageFigure.blotName = 'imageFigure'
ImageFigure.className = 'image'
ImageFigure.tagName = 'figure'

Quill.register('formats/imageFigure', ImageFigure)

export default ImageFigure
