import { toSizedImageURL } from '../url'

/**
 * Strip HTML tags from HTML string to get plain text.
 * @param html - html string
 * @param tagReplacement - string to replace tags
 * @param lineReplacement - string to replace tags
 *
 * @see {@url https://github.com/thematters/ipns-site-generator/blob/main/src/utils/index.ts}
 */
type StripHTMLOptions = {
  tagReplacement?: string
  lineReplacement?: string
  ensureMentionTrailingSpace?: boolean
}

export const stripHtml = (html: string, options?: StripHTMLOptions) => {
  options = {
    tagReplacement: '',
    lineReplacement: '\n',
    ensureMentionTrailingSpace: false,
    ...options,
  }

  const { tagReplacement, lineReplacement, ensureMentionTrailingSpace } =
    options

  html = String(html) || ''

  html = html.replace(/\&nbsp\;/g, ' ')

  // Replace block-level elements with newlines
  html = html.replace(/<(\/?p|\/?blockquote|br\/?)>/gi, lineReplacement!)

  // Handle @user mentions and appending a space
  if (ensureMentionTrailingSpace) {
    html = html.replace(
      /<a\s+[^>]*class="mention"[^>]*>(.*?)<\/a>(.{1})/gi,
      (_, p1, p2) => {
        return `${p1}${p2 === ' ' ? ' ' : ` ${p2}`}`
      }
    )
  }

  // Remove remaining HTML tags
  let plainText = html.replace(/<\/?[^>]+(>|$)/g, tagReplacement!)

  // Normalize multiple newlines and trim the result
  plainText = plainText.replace(/\n\s*\n/g, '\n').trim()

  return plainText
}

/**
 * Return beginning of text in html as summary, split on sentence break within buffer range.
 * @param html - html string to extract summary
 * @param length - target length of summary
 * @param buffer - buffer range to search for sentence break
 */
export const makeSummary = (html: string, length = 140, buffer = 20) => {
  // split on sentence breaks
  const sections = stripHtml(html, {
    lineReplacement: ' ',
  })
    .replace(/&[^;]+;/g, ' ') // remove html entities
    .replace(/([?!。？！]|(\.\s))\s*/g, '$1|') // split on sentence breaks
    .split('|')

  // grow summary within buffer
  let summary = ''
  while (summary.length < length - buffer && sections.length > 0) {
    const el = sections.shift() || ''

    const addition =
      el.length + summary.length > length + buffer
        ? `${el.substring(0, length - summary.length)}…`
        : el

    summary = summary.concat(addition)
  }

  return summary
}

/**
 * Simple words' length counting.
 */
export const countChars = (text: string) => {
  if (!text) {
    return 0
  }

  return text.split('').reduce((count, char, index) => {
    return count + (text.charCodeAt(index) < 256 ? 1 : 2)
  }, 0)
}

/**
 * Simple substring title by words' length counting.
 */
export const normalizeArticleTitle = (text: string, limit: number) => {
  const buffer = 3
  const length = countChars(text)

  if (text && length > limit) {
    let sum = 0
    let lastIndex = 0
    for (let index = 0; index < text.length; index++) {
      sum = sum + (text.charCodeAt(index) < 256 ? 1 : 2)
      if (sum >= limit - buffer && lastIndex === 0) {
        lastIndex = index
        break
      }
    }

    return text.substring(0, lastIndex) + '…'
  }

  return text
}

/**
 * Optimize embed images & iframes
 *
 * 1) Add loading=lazy attribute
 * 2) Responsive Images
 *
 * @see `<ResponsiveImage>`
 */
export const optimizeEmbed = (content: string) => {
  return content
    .replace(/\<iframe /g, '<iframe loading="lazy" ')
    .replace(
      /<img\s[^>]*?src\s*=\s*['\"]([^'\"]*?)['\"][^>]*?>/g,
      (match, src, offset) => {
        return /* html */ `
      <picture>
        <source
          srcSet=${toSizedImageURL({
            url: src,
            width: 1376,
            enableAnimation: true,
          })}
          onerror="this.srcset='${src}'"
        />

        <img
          src=${src}
          srcSet=${toSizedImageURL({
            url: src,
            width: 1376,
            enableAnimation: true,
          })}
          loading="lazy"
        />
      </picture>
    `
      }
    )
}

/**
 * Match figure tag in HTML content.
 */
const REGEXP_FIGURE_TAG = new RegExp('<figure[^>]*>(.*?)</figure>')

export const containsFigureTag = (content: string) => {
  return REGEXP_FIGURE_TAG.test(content)
}
