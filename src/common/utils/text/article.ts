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

const REGEXP_LATIN = 'A-Za-z\u00C0-\u00FF'
const REGEXP_CJK =
  '\u4E00-\u9FFF\u3400-\u4DBF\u20000-\u2A6DF\u2A700-\u2B73F\u2B740-\u2B81F\u2B820-\u2CEAF\uF900-\uFAFF\u2F800-\u2FA1F'
const REGEXP_DIGIT = '0-9'
const REGEXP_PUNCTUATION = '\\p{P}'

const countUnits = (text: string): number => {
  // Count @mentions as 1 unit
  if (text.startsWith('@')) return 1

  // Count Latin word as 1 unit
  if (new RegExp(`^[${REGEXP_LATIN}]+$`).test(text)) return 1

  // Count each CJK character or digit as 1 unit
  return Array.from(text).reduce((count, char) => {
    // If it's a CJK character or digit, count it as 1 unit
    if (new RegExp(`[${REGEXP_CJK}]|[${REGEXP_DIGIT}]`).test(char)) {
      return count + 1
    }
    // Otherwise (punctuation, whitespace, etc.), don't count
    return count
  }, 0)
}

export const makeSummary = (html: string, maxUnits = 20) => {
  // Clean the HTML content first
  const plainText = stripHtml(html, { lineReplacement: ' ' })
    .replace(/&[^;]+;/g, ' ') // remove html entities
    .replace(/\s+/g, ' ') // normalize whitespace
    .trim()

  // Split the content into matchable tokens
  const matches =
    plainText.match(
      // Match @mentions, Latin words, CJK characters, digits, and other characters
      new RegExp(
        `(@\\S+|[${REGEXP_LATIN}]+|[${REGEXP_CJK}]|[${REGEXP_DIGIT}]|[^${REGEXP_LATIN}${REGEXP_CJK}${REGEXP_DIGIT}\\s]|\\s)`,
        'gu'
      )
    ) || []

  let summary = ''
  let units = 0
  let hasMore = false

  // Process each token
  for (const token of matches) {
    // If it's whitespace or punctuation, include it but don't count as a unit
    if (
      /^\s+$/.test(token) ||
      new RegExp(`^[${REGEXP_PUNCTUATION}]+$`, 'u').test(token)
    ) {
      if (!hasMore) {
        summary += token
      }
      continue
    }

    const tokenUnits = countUnits(token)

    // If this token would exceed the max units, mark there's more content
    if (units + tokenUnits > maxUnits) {
      hasMore = true
      break
    }

    // Add the token and count its units
    summary += token
    units += tokenUnits
  }

  // Add ellipsis if there's more content that wasn't included
  if (hasMore) {
    summary = summary.trim() + '…'
  }

  return summary.trim()
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
