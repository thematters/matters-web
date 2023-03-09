import { Node } from '@tiptap/core'

/**
 * FigureEmbed extension:
 *
 * @see {https://tiptap.dev/experiments/embeds}
 *
 * ```html
 * <figure class="embed">
 *   <div class="iframe-container">
 *     <iframe
 *       loading="lazy"
 *       src="URL"
 *       frameborder="0"
 *       sandbox="allow-scripts allow-same-origin allow-popups">
 *     </iframe>
 *   </div>
 *
 *   <figcaption>CAPTION</figcaption>
 * </figure
 * ```
 */

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    figureEmbed: {
      setFigureEmbed: (options: { src: string; caption?: string }) => ReturnType
    }
  }
}

// if (value.match(/http(s)?:\/\/jsfiddle.net\//)) {
//   return `https://jsfiddle.net/${getPath(value)}/embedded/`
// }
// if (value.match(/http(s)?:\/\/(button\.)?like\.co\//)) {
//   return URL_LIKE_BUTTON
// }
type NormalizeEmbedURLReturn = {
  url: string
  provider?:
    | 'youtube'
    | 'vimeo'
    | 'bilibili'
    | 'twitter'
    | 'instagram'
    | 'jsfiddle'
    | 'codepen'
  allowfullscreen: boolean
  sandbox: Array<'allow-scripts' | 'allow-same-origin' | 'allow-popups'>
}
export const normalizeEmbedURL = (url: string): NormalizeEmbedURLReturn => {
  const fallbackReturn: NormalizeEmbedURLReturn = {
    url: '',
    allowfullscreen: false,
    sandbox: [],
  }
  let inputUrl
  try {
    inputUrl = new URL(url)
  } catch (e) {
    return fallbackReturn
  }

  const { hostname, pathname, searchParams } = inputUrl

  // if (!hostname) {
  //   throw
  // }

  /**
   * YouTube
   *
   * URL:
   *   - https://www.youtube.com/watch?v=ARJ8cAGm6JE
   *   - https://www.youtube.com/embed/ARJ8cAGm6JE
   *   - https://youtu.be/ARJ8cAGm6JE
   *
   * Params:
   *   - t=123 for start time
   *   - v=ARJ8cAGm6JE for video id
   */
  const isYouTube = [
    'youtube.com',
    'youtu.be',
    'www.youtu.be',
    'www.youtube.com',
  ].includes(hostname)
  if (isYouTube) {
    const v = searchParams.get('v')
    const t = searchParams.get('t')
    const qs = new URLSearchParams({
      rel: '0',
      ...(t ? { start: t } : {}),
    }).toString()

    let id = ''
    if (v) {
      id = v
    } else if (pathname.match('/embed/')) {
      id = pathname.split('/embed/')[1]
    } else if (hostname.includes('youtu.be')) {
      id = pathname.split('/')[1]
    }

    return {
      url: `https://www.youtube.com/embed/${id}` + (qs ? `?=${qs}` : ''),
      provider: 'youtube',
      allowfullscreen: true,
      sandbox: [],
    }
  }

  /**
   * Vimeo
   *
   * URL:
   *   - https://vimeo.com/332732612
   *   - https://player.vimeo.com/video/332732612
   */
  const isVimeo = ['vimeo.com', 'www.vimeo.com', 'player.vimeo.com'].includes(
    hostname
  )
  if (isVimeo) {
    const id = pathname.split('/').slice(-1)[0]
    return {
      url: 'https://player.vimeo.com/video/' + id,
      provider: 'vimeo',
      allowfullscreen: true,
      sandbox: [],
    }
  }

  /**
   * bilibili
   *
   * URL:
   *   - https://www.bilibili.com/video/BV1bW411n7fY/
   *   - https://www.bilibili.com/BV1bW411n7fY/
   *   - https://player.bilibili.com/player.html?bvid=BV1bW411n7fY
   *
   * Params:
   *   - bvid=BV1bW411n7fY for video id
   */
  const isBilibili = [
    'bilibili.com',
    'player.bilibili.com',
    'www.bilibili.com',
  ].includes(hostname)
  if (isBilibili) {
    const bvid = searchParams.get('bvid')

    let id = ''
    if (bvid) {
      id = bvid
    } else {
      id = pathname.split('/').slice(-1)[0]
    }

    return {
      url: `https://player.bilibili.com/player.html?bvid=${id}`,
      provider: 'bilibili',
      allowfullscreen: true,
      sandbox: [],
    }
  }

  // Twitter

  // Instagram

  // JSFiddle
  // if (value.match(/http(s)?:\/\/jsfiddle.net\//)) {
  //   return `https://jsfiddle.net/${getPath(value)}/embedded/`
  // }

  // CodePen

  return fallbackReturn
}

export const FigureEmbed = Node.create({
  name: 'figureEmbed',
  group: 'block',
  content: 'inline*',
  draggable: true,
  isolating: true,

  addAttributes() {
    return {
      class: {
        default: null,
        parseHTML: (element) => element.getAttribute('class'),
      },
      src: {
        default: null,
        parseHTML: (element) =>
          element.querySelector('iframe')?.getAttribute('src'),
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'figure',
        attrs: { class: 'embed' },
        contentElement: 'figcaption',
        getAttrs: (node) => {
          // matches only `<figure class="embed">`
          if (node instanceof HTMLElement) {
            return node.classList.contains('embed') && null
          }
          return false
        },
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    const { url, provider, allowfullscreen, sandbox } = normalizeEmbedURL(
      HTMLAttributes.src
    )

    return [
      'figure',
      { class: 'embed', ...(provider ? { 'data-provider': provider } : {}) },
      [
        'div',
        { class: 'iframe-container' },
        [
          'iframe',
          {
            src: url,
            loading: 'lazy',
            ...(sandbox && sandbox.length > 0
              ? { sandbox: sandbox.join(' ') }
              : {}),
            ...(allowfullscreen ? { allowfullscreen: true } : {}),
            frameborder: '0',
            draggable: false,
            contenteditable: false,
          },
        ],
      ],
      ['figcaption', 0],
    ]
  },

  addCommands() {
    return {
      setFigureEmbed:
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
