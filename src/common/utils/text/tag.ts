import {
  MAX_TAG_CONTENT_LENGTH,
  TAG_CONTENT_CLAMP_LATIN_LETTERS_LENGTH,
  TAG_CONTENT_CLAMP_LENGTH,
} from '~/common/enums'

const anyNonAlphaNum = new RegExp(String.raw`[^\p{Letter}\p{Number}]+`, 'gu')
const allLatinLetters = new RegExp(String.raw`^[\s -~\p{Script=Latin}]+$`, 'u')

// to simulate slugify at DB server side
// https://github.com/thematters/matters-metabase/blob/master/sql/stale-tags-create-table-view.sql#L2-L13
// might be able to use under more scenarios
export const slugifyTag = (content: string) =>
  `${content}`
    // .toLowerCase()
    .replace(anyNonAlphaNum, '-') // replace all non alpha-number to `-`, including spaces and punctuations
    .replace(/(^-+|-+$)/g, '') // strip leading or trailing `-` if there's any

const stripTagAllPunct = (content: string) => {
  const words = `${content}`.split(anyNonAlphaNum).filter(Boolean)
  return words.length === 0 ? '' : words.join(' ')
}

export const normalizeTag = (content: string) =>
  stripTagAllPunct(content).substring(0, MAX_TAG_CONTENT_LENGTH)

export const clampTag = (tagContent: string) => {
  if (allLatinLetters.test(tagContent)) {
    if (tagContent.length > TAG_CONTENT_CLAMP_LATIN_LETTERS_LENGTH) {
      // allow 20 chars for ASCII/latin letters only tag
      return `${tagContent.slice(0, TAG_CONTENT_CLAMP_LATIN_LETTERS_LENGTH)}…`
    }
  } else {
    if (tagContent.length > TAG_CONTENT_CLAMP_LENGTH) {
      return `${tagContent.slice(0, TAG_CONTENT_CLAMP_LENGTH)}…`
    }
  }
  return tagContent
}
