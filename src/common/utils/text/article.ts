import { distance } from 'fastest-levenshtein'

import { toSizedImageURL } from '../url'

/**
 * Strip HTML tags from HTML string to get plain text.
 * @param html - html string
 * @param tagReplacement - string to replace tags
 * @param lineReplacement - string to replace tags
 *
 * @see {@url https://github.com/thematters/ipns-site-generator/blob/main/src/utils/index.ts}
 */
export const stripHtml = (
  html: string,
  tagReplacement = '',
  lineReplacement = '\n'
) => {
  html = String(html) || ''

  html = html.replace(/<(\/?p|\/?blockquote|br\/?)>/gi, lineReplacement)

  // Remove remaining HTML tags
  let plainText = html.replace(/<\/?[^>]+(>|$)/g, tagReplacement)

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
  const sections = stripHtml(html, '', ' ')
    .replace(/([?!。？！]|(\.\s))\s*/g, '$1|')
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
          srcSet=${toSizedImageURL({ url: src, width: 1376 })}
          onerror="this.srcset='${src}'"
        />

        <img
          src=${src}
          srcSet=${toSizedImageURL({ url: src, width: 1376 })}
          loading="lazy"
        />
      </picture>
    `
      }
    )
}

/**
 * Get distances of two context diffs.
 */
export const measureDiffs = (source: string, target: string) =>
  distance(source, target)
