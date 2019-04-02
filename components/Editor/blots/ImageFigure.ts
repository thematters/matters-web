import { Quill } from 'react-quill'

const Parchment = Quill.import('parchment')
const BlockEmbed = Quill.import('blots/block/embed')

class ImageFigure extends BlockEmbed {
  static create(value: { src?: string; caption?: string }) {
    const node = super.create(value)

    const caption = Parchment.create('figcaption', value.caption).domNode
    const image = document.createElement('img')
    image.setAttribute('src', value.src || '')

    node.setAttribute('contenteditable', 'fasle')
    node.appendChild(image)
    node.appendChild(caption)

    return node
  }

  static value(domNode: HTMLElement): any {
    const image = domNode.querySelector('img')
    const caption = domNode.querySelector('figcaption')

    const value: { src?: string; caption?: string } = {}

    if (image) {
      value.src = image.getAttribute('src') || undefined
    }

    if (caption) {
      value.caption = caption.innerText || undefined
    }

    return value
  }
}

ImageFigure.blotName = 'imageFigure'
ImageFigure.className = 'image'
ImageFigure.tagName = 'figure'

Quill.register('formats/imageFigure', ImageFigure)

export default ImageFigure
