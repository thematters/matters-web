import { Node } from '@tiptap/core'

/**
 * FigureAudio extension:
 *
 * @see {https://tiptap.dev/experiments/figure}
 *
 * ```html
 * <figure class="audio">
 *   <source src="URL" type="audio/mp3" />
 *
 *   <div class="player">
 *     <header>
 *       <div class="meta">
 *         <h4 class="title">TITLE</h4>
 *         <div class="time">
 *           <span class="current" data-time="00:00"></span>
 *           <span class="duration" data-time="39:05"></span>
 *         </div>
 *       </div>
 *       <span class="play"></span>
 *     </header>
 *     <footer>
 *       <div class="progress-bar"><span></span></div>
 *     </footer>
 *   </div>
 *
 *   <figcaption>CAPTION</figcaption>
 * </figure
 * ```
 */

export interface FigureAudioOptions {
  HTMLAttributes: Record<string, any>
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    figureAudio: {
      setFigureAudio: (options: {
        src: string
        caption?: string
        title: string
        duration: string
      }) => ReturnType
    }
  }
}

export const FigureAudio = Node.create<FigureAudioOptions>({
  name: 'figureAudio',
  group: 'block',
  content: 'inline*',
  draggable: true,
  isolating: true,

  addAttributes() {
    return {
      src: {
        default: null,
        parseHTML: (element) =>
          element.querySelector('source')?.getAttribute('src'),
      },
      title: {
        default: '',
        parseHTML: (element) => element.querySelector('.title')?.textContent,
      },
      duration: {
        default: '00:00',
        parseHTML: (element) => {
          const $duration = element.querySelector('.duration') as HTMLElement
          return $duration?.dataset?.time
        },
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'figure',
        contentElement: 'figcaption',
        getAttrs: (node) => {
          // matches only `<figure class="audio">`
          if (node instanceof HTMLElement) {
            return node.classList.contains('audio') && null
          }
          return false
        },
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'figure',
      { class: 'audio' },
      [
        'audio',
        { controls: true },
        [
          'source',
          {
            src: HTMLAttributes.src,
            type: 'audio/mp3',
            draggable: false,
            contenteditable: false,
          },
        ],
      ],
      [
        'div',
        { class: 'player' },
        [
          'header',
          [
            'div',
            { class: 'meta' },
            ['h4', { class: 'title' }, HTMLAttributes.title],
            [
              'div',
              { class: 'time' },
              ['span', { class: 'current', 'data-time': '00:00' }],
              [
                'span',
                {
                  class: 'duration',
                  'data-time': HTMLAttributes.duration,
                },
              ],
            ],
          ],
          ['span', { class: 'play' }],
        ],
        ['footer', ['div', { class: 'progress-bar' }, ['span', {}]]],
      ],
      ['figcaption', 0],
    ]
  },

  addCommands() {
    return {
      setFigureAudio:
        ({ caption, ...attrs }) =>
        ({ chain }) => {
          return (
            chain()
              .insertContent({
                type: this.name,
                attrs,
                content: caption ? [{ type: 'text', text: caption }] : [],
              })
              // set cursor at end of caption field
              .command(({ tr, commands }) => {
                const { doc, selection } = tr
                const position = doc.resolve(selection.to - 2).end()

                return commands.setTextSelection(position)
              })
              .run()
          )
        },
    }
  },
})
