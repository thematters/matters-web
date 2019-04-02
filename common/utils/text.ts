/**
 * Remove html tag and merge multiple spaces into one.
 */
export const stripHtml = (value: string | null) =>
  (value || '').replace(/(<([^>]+)>)/gi, '').replace(/(&nbsp;| )+/gi, ' ')

/**
 * Removes leading and trailing line breaks from (Quill's) HTML string.
 */
export const trimLineBreaks = (html: string) => {
  const LINE_BREAK = '<p><br></p>'
  const re = new RegExp(`(^(${LINE_BREAK})*)|((${LINE_BREAK})*$)`, 'g')
  return html.replace(re, '')
}
