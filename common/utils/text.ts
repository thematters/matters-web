/**
 * Remove html tag and merge multiple spaces into one.
 */
export const stripHtml = (html: string | null, replacement = ' ') =>
  (html || '')
    .replace(/(<\/p><p>|&nbsp;)/g, ' ') // replace line break and space first
    .replace(/(<([^>]+)>)/gi, replacement)

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
