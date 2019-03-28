import { Quill } from 'react-quill'

const BlockEmbed = Quill.import('blots/block/embed')

class ImageFigure extends BlockEmbed {
  public static create(value: { src?: string; caption?: string }) {
    const node = super.create(value)

    const image = document.createElement('img')
    image.setAttribute('src', value.src || '')

    const caption = document.createElement('figcaption')
    caption.innerText = value.caption || ''

    node.appendChild(image)
    node.appendChild(caption)

    return node
  }

  public static value(domNode: HTMLElement): any {
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
ImageFigure.tagName = 'figure'
ImageFigure.className = 'image'

Quill.register('formats/imageFigure', ImageFigure)

export default ImageFigure
