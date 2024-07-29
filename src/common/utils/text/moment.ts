import { UserLanguage } from '~/gql/graphql'

/**
 * Truncates a title to a specified maximum length, while preserving tagged users.
 *
 * @param title - The title to truncate.
 * @param maxLength - The maximum length of the truncated title.
 * @param locale - The locale to determine the truncation rules. Defaults to 'en'.
 * @returns The truncated title with preserved tagged users.
 */
export const truncateMomentTitle = (
  title: string,
  maxLength: number = 10,
  locale: UserLanguage = UserLanguage.En
) => {
  if (/^zh/.test(locale)) {
    return truncateTitleForCJK(title, maxLength)
  } else {
    return truncateTitleForEnglish(title, maxLength)
  }
}

/**
 * Truncates a title in English to a specified maximum length, while preserving tagged users.
 *
 * @param title - The title to truncate.
 * @param maxLength - The maximum length of the truncated title.
 * @returns The truncated title with preserved tagged users.
 */
const truncateTitleForEnglish = (title: string, maxLength: number) => {
  const words = title.split(/\s+/)
  let hasTag = words.some((word) => word.startsWith('@'))
  let truncated = ''
  let count = 0

  for (const word of words) {
    if (word.startsWith('@')) {
      truncated += `${word} `
      continue
    }
    if (count + word.length + 1 > maxLength) {
      break
    }
    truncated += `${word} `
    count += word.length + 1
  }

  let base = truncated.trim() + (title.length > count ? '...' : '')
  if (hasTag && !base.includes('@')) {
    for (const word of words) {
      if (word.startsWith('@')) {
        base += `${word} `
      }
    }
  }

  return base.trim()
}

/**
 * Truncates a title in CJK (Chinese, Japanese, Korean) to a specified maximum length, while preserving tagged users.
 *
 * @param title - The title to truncate.
 * @param maxLength - The maximum length of the truncated title.
 * @returns The truncated title with preserved tagged users.
 */
const truncateTitleForCJK = (title: string, maxLength: number) => {
  const pattern = /(@\w+|[^\x00-\x7F]|\s)/gu
  const phrases = title.match(pattern)?.filter((s) => s !== ' ') || []
  let hasTag = phrases.some((p) => p.startsWith('@'))
  let count = 0
  let truncated = ''

  for (const [idx, p] of phrases.entries()) {
    if (p.startsWith('@')) {
      if (idx + 1 == phrases.length) {
        truncated += ` ${p}`
        count += 1
      } else if (idx === 0) {
        truncated += `${p} `
        count += 1
      } else {
        truncated += ` ${p} `
        count += 2
      }
      continue
    }
    if (count + 1 > maxLength) {
      break
    }
    truncated += p
    count++
  }

  let base = truncated.trim() + (title.length > count ? '...' : '')
  if (hasTag && !base.includes('@')) {
    for (const p of phrases) {
      if (p.startsWith('@')) {
        base += `${p} `
      }
    }
  }

  return base.trim()
}
