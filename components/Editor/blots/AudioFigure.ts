import { Quill } from 'react-quill'

const Parchment = Quill.import('parchment')
const BlockEmbed = Quill.import('blots/block/embed')

class AudioFigure extends BlockEmbed {
  public static create(value: {
    src?: string
    caption?: string
    id?: string
    assetId?: string
  }) {
    const node = super.create(value)

    const figcaption = Parchment.create('figcaption', value.caption || '')
      .domNode

    const audio = document.createElement('audio')
    audio.setAttribute('src', value.src || '')
    audio.setAttribute('controls', '')

    if (value.id) {
      audio.setAttribute('id', value.id)
    }

    if (value.assetId) {
      audio.dataset.assetId = value.assetId
    }

    node.appendChild(audio)
    node.appendChild(figcaption)

    return node
  }

  static value(domNode: HTMLElement): any {
    const audio = domNode.querySelector('audio')
    const caption = domNode.querySelector('figcaption')

    return {
      src: audio ? audio.getAttribute('src') : '',
      caption: caption ? caption.innerText : '',
      assetId: audio ? audio.dataset.assetId : undefined
    }
  }
}

AudioFigure.blotName = 'audioFigure'
AudioFigure.className = 'audio'
AudioFigure.tagName = 'figure'

Quill.register('formats/audioFigure', AudioFigure)

export default AudioFigure
