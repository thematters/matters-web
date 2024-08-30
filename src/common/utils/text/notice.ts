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
  '[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff66-\uff9f]'

function countUnits(word: string) {
  // Latin word
  if (/^@\w+/.test(word) || new RegExp(`^@${REGEXP_CJK}+`).test(word)) {
    return 1
  }
  // CJK
  else if (new RegExp(REGEXP_CJK, 'g').test(word)) {
    return 1
  }
  // Latin
  else if (/^\w+/.test(word)) {
    return 1
  }

  // Ignore spaces and punctuations
  return 0
}

function trimSpacesAndPunctuations(str: string) {
  return str.replace(/^[\s\p{P}]+|[\s\p{P}]+$/gu, '')
}

export const truncateNoticeTitle = (title: string, maxLength: number = 10) => {
  const components =
    title.match(
      new RegExp(`(@\\w+|@${REGEXP_CJK}+|\\w+|${REGEXP_CJK}|[^\w\s])`, 'g')
    ) || []

  let truncatedTitle = ''
  let currentLength = 0

  for (const [index, component] of components.entries()) {
    const componentUnits = countUnits(component)

    if (currentLength + componentUnits > maxLength) {
      if (index < components.length - 1) {
        truncatedTitle = trimSpacesAndPunctuations(truncatedTitle) + '...'
      }
      break
    }

    truncatedTitle += component
    currentLength += componentUnits
  }

  return truncatedTitle
}
