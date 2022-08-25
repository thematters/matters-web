import { distance } from 'fastest-levenshtein'

import { MAX_TAG_CONTENT_LENGTH } from '~/common/enums'

import { toSizedImageURL } from './url'

/**
 * Remove html tag and merge multiple spaces into one.
 */
export const stripHtml = (html: string | null, replacement = ' ') =>
  (html || '')
    .replace(/(<\/p><p>|&nbsp;)/g, ' ') // replace line break and space first
    .replace(/(<([^>]+)>)/gi, replacement)
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')

export const makeSummary = (html: string, length = 140) => {
  // buffer for search
  const buffer = 20

  // split on sentence breaks
  const sections = stripHtml(html, '')
    .replace(/([?!。？！]|(\.\s))\s*/g, '$1|')
    .split('|')

  // grow summary within buffer
  let summary = ''
  while (summary.length < length - buffer && sections.length > 0) {
    const el = sections.shift() || ''

    const addition =
      el.length + summary.length > length + buffer
        ? `${el.substring(0, length - summary.length)}...`
        : el

    summary = summary.concat(addition)
  }

  return summary
}

/**
 * Removes leading and trailing line breaks from (Quill's) HTML string.
 */
export const trimLineBreaks = (html: string) => {
  const LINE_BREAK = '<p><br></p>'
  const re = new RegExp(`(^(${LINE_BREAK})*)|((${LINE_BREAK})*$)`, 'g')
  return html.replace(re, '')
}

/**
 * Simple words' length counting.
 */
export const countWordsLength = (text: string) => {
  return text
    ? text.split('').reduce((count, char, index) => {
        return count + (text.charCodeAt(index) < 256 ? 1 : 2)
      }, 0)
    : 0
}

/**
 * Simple substring title by words' length counting.
 */
export const makeTitle = (text: string, limit: number) => {
  const buffer = 3
  const length = countWordsLength(text)
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
    return text.substring(0, lastIndex) + '...'
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
    .replace(/\<iframe /g, '<iframe loading="lazy"')
    .replace(
      /<img\s[^>]*?src\s*=\s*['\"]([^'\"]*?)['\"][^>]*?>/g,
      (match, src, offset) => {
        return /* html */ `
      <picture>
        <source
          type="image/webp"
          media="(min-width: 768px)"
          srcSet=${toSizedImageURL({ url: src, size: '1080w', ext: 'webp' })}
          onerror="this.srcset='${src}'"
        />

        <source
          media="(min-width: 768px)"
          srcSet=${toSizedImageURL({ url: src, size: '1080w' })}
          onerror="this.srcset='${src}'"
        />

        <source
          type="image/webp"
          srcSet=${toSizedImageURL({ url: src, size: '540w', ext: 'webp' })}
        />

        <img
          src=${src}
          srcSet=${toSizedImageURL({ url: src, size: '540w' })}
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

// for Twitter and others which do not support non-English in URL
export const stripNonEnglishUrl = (url: string) => {
  // const frag = url.split('#', 2)?.[1] // anything after '#'
  const hash = url.match(/(#[\x21-\x7e]+)$/)?.[1] ?? ''
  // get the beginning portion of all printable ascii, and must ends with ASCII '\w'
  const turl = url.match(/^[\x21-\x7e]+[A-Za-z0-9]/)?.[0]
  return turl ? `${turl}${hash}` : url // fallback to full url
}

const nonAlphaNumUni = String.raw`[^\p{Letter}\p{Number}]+`
const anyNonAlphaNum = new RegExp(nonAlphaNumUni, 'gu')

// to simulate slugify at DB server side
// https://github.com/thematters/matters-metabase/blob/master/sql/stale-tags-create-table-view.sql#L2-L13
// might be able to use under more scenarios
export const tagSlugify = (content: string) =>
  `${content}`
    // .toLowerCase()
    .replace(anyNonAlphaNum, '-') // replace all non alpha-number to `-`, including spaces and punctuations
    .replace(/(^-+|-+$)/g, '') // strip leading or trailing `-` if there's any

export const stripAllPunct = (content: string) => {
  const words = `${content}`.split(anyNonAlphaNum).filter(Boolean)
  switch (words.length) {
    case 0:
      return ''
    case 1:
      return words[0]
    default:
      const [first, ...rest] = words
      return `${first} ${rest.join('')}`
  }
}

export const normalizeTagInput = (content: string) =>
  stripAllPunct(content).substring(0, MAX_TAG_CONTENT_LENGTH)
