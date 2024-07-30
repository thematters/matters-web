import { UserLanguage } from '~/gql/graphql'

type TruncateNoticeTitleOptions = {
  locale?: UserLanguage
  maxLength?: number
  includeAtSign?: boolean
}

/**
 * Truncates a title to a specified maximum length, while preserving tagged users.
 *
 * @param title - The title to truncate.
 * @param maxLength - The maximum length of the truncated title.
 * @param locale - The locale to determine the truncation rules. Defaults to 'en'.
 * @returns The truncated title with preserved tagged users.
 */
export const truncateNoticeTitle = (
  title: string,
  options: TruncateNoticeTitleOptions = {}
) => {
  const DEFAULTS = {
    locale: UserLanguage.En,
    includeAtSign: false,
    maxLength: 10,
  }
  let localOptions = { ...DEFAULTS, ...options }

  if (/^zh/.test(localOptions.locale)) {
    return localOptions.includeAtSign
      ? truncateTitleForChineseWithAtSign(title, localOptions)
      : truncateTitleForChinese(title, localOptions)
  } else {
    return localOptions.includeAtSign
      ? truncateTitleForEnglishWithAtSign(title, localOptions)
      : truncateTitleForEnglish(title, localOptions)
  }
}

/**
 * Truncates a title to a specified maximum length for Chinese (Simplified or traditional) text.
 *
 * @param text - The title to truncate.
 * @param maxWords - The maximum number of words in the truncated title. Defaults to 10.
 * @returns The truncated title.
 */
export function truncateTitleForChinese(
  text: string,
  {
    maxLength,
  }: { maxLength: NonNullable<TruncateNoticeTitleOptions['maxLength']> }
): string {
  const chineseRegex = /[\u4e00-\u9fa5]/g
  const chineseWords = text.match(chineseRegex)
  if (chineseWords && chineseWords.length > maxLength) {
    return chineseWords.slice(0, maxLength).join('') + '...'
  }
  return text
}

/**
 * Truncates a title to a specified maximum length for English text.
 *
 * @param text - The title to truncate.
 * @param maxLength - The maximum length of the truncated title. Defaults to 50.
 * @returns The truncated title.
 */
export function truncateTitleForEnglish(
  text: string,
  {
    maxLength,
  }: { maxLength: NonNullable<TruncateNoticeTitleOptions['maxLength']> }
): string {
  if (text.length > maxLength) {
    const words = text.split(' ')
    let truncatedText = ''
    let count = 0
    for (const word of words) {
      if (count + word.length <= maxLength) {
        truncatedText += word + ' '
        count += word.length + 1
      } else {
        break
      }
    }
    return truncatedText.trim() + '...'
  }
  return text
}

/**
 * Truncates a title in English to a specified maximum length, while preserving tagged users.
 *
 * @param title - The title to truncate.
 * @param maxLength - The maximum length of the truncated title.
 * @returns The truncated title with preserved tagged users.
 */
const truncateTitleForEnglishWithAtSign = (
  title: string,
  {
    maxLength,
  }: { maxLength: NonNullable<TruncateNoticeTitleOptions['maxLength']> }
) => {
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
const truncateTitleForChineseWithAtSign = (
  title: string,
  {
    maxLength,
  }: { maxLength: NonNullable<TruncateNoticeTitleOptions['maxLength']> }
) => {
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
