import { Quill } from 'react-quill'

const Parchment = Quill.import('parchment')
const BlockEmbed = Quill.import('blots/block/embed')

class AudioFigure extends BlockEmbed {
  public static create(value: {
    sources: Array<{ src: string; type: string }>
    fileName?: string
    caption?: string
  }) {
    const node = super.create(value)

    const figcaption = Parchment.create('figcaption', value.caption || '')
      .domNode

    // audio
    const audio = document.createElement('audio')
    audio.setAttribute('controlsList', 'nodownload')
    audio.dataset.fileName = value.fileName
    value.sources.forEach(({ src, type }) => {
      const source = Parchment.create('source', { src, type }).domNode
      audio.appendChild(source)
    })

    // player
    const player = document.createElement('div')
    player.setAttribute('class', 'player')
    node.setAttribute('contenteditable', 'false')
    player.innerHTML = `
      <header>
        <div class="meta">
          <h4 class="title">${value.fileName}</h4>

          <div class="time">
            <span class="current"></span>
            <span class="duration"></span>
          </div>
        </div>

        <span class="play"></span>
      </header>

      <footer>
        <div class="progress-bar">
          <span></span>
        </div>
      </footer>
    `

    node.appendChild(audio)
    node.appendChild(player)
    node.appendChild(figcaption)

    return node
  }

  static value(domNode: HTMLElement): any {
    const audio = domNode.querySelector('audio')
    const caption = domNode.querySelector('figcaption')
    const sources = domNode.querySelectorAll('source')

    const sourcesVal: Array<{ src: string; type: string }> = []
    if (sources.length > 0) {
      Array.prototype.forEach.call(sources, (node: HTMLElement) => {
        sourcesVal.push({
          src: node.getAttribute('src') || '',
          type: node.getAttribute('type') || ''
        })
      })
    }

    return {
      sources: sourcesVal,
      fileName: audio ? audio.dataset.fileName : '',
      caption: caption ? caption.innerText : ''
    }
  }
}

AudioFigure.blotName = 'audioFigure'
AudioFigure.className = 'audio'
AudioFigure.tagName = 'figure'

Quill.register('formats/audioFigure', AudioFigure)

export default AudioFigure
