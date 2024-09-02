import { PUNCTUATION_CHINESE } from '../form'

/**
 * Truncates a title to a specified maximum length, while preserving tagged users.
 *
 * @param title - The title to truncate.
 * @param maxLength - The maximum length of the truncated title.
 *   - Each CJK character is counted as 1 unit.
 *   - Each latin word is counted as 1 unit.
 *   - Each tagged user is counted as 1 unit.
 *   - Ignoer spaces and punctuations.
 *
 * @returns The truncated title with preserved tagged users.
 */
const REGEXP_CJK =
  '\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff66-\uff9f'

const REGEXP_LATIN = 'A-Za-zÀ-ÖØ-öø-ÿ0-9'

const REGEXP_PUNCTUATION = `[${PUNCTUATION_CHINESE}\x00-\x2f\x3a-\x3f\x41\x5b-\x60\x7a-\x7f]` // without "@"

function countUnits(word: string) {
  // Tagged user
  if (/^@[^\s]+/.test(word)) {
    return 1
  }
  // CJK
  else if (new RegExp(`[${REGEXP_CJK}]`, 'g').test(word)) {
    return 1
  }
  // Latin
  else if (new RegExp(`[${REGEXP_LATIN}]+`).test(word)) {
    return 1
  }

  // Ignore spaces and punctuations
  return 0
}

function trimSpacesAndPunctuations(str: string) {
  return str
    .trim()
    .replace(
      new RegExp(`^${REGEXP_PUNCTUATION}+|${REGEXP_PUNCTUATION}+$`, 'g'),
      ''
    )
}

export const truncateNoticeTitle = (title: string, maxLength: number = 10) => {
  const components =
    title.match(
      new RegExp(`(@[^\\s]+|[${REGEXP_LATIN}]+|[^${REGEXP_LATIN}\s])`, 'g')
    ) || []

  let truncatedTitle = ''
  let currentLength = 0

  for (const [index, component] of components.entries()) {
    const componentUnits = countUnits(component)

    if (currentLength + componentUnits > maxLength) {
      // if the current component is not the last one, add ellipsis
      if (index <= components.length - 1) {
        truncatedTitle = trimSpacesAndPunctuations(truncatedTitle) + '...'
      } else {
        truncatedTitle = trimSpacesAndPunctuations(truncatedTitle)
      }
      break
    }

    truncatedTitle += component
    currentLength += componentUnits
  }

  return truncatedTitle
}
