import { UserLanguage } from "~/gql/graphql"

/**
 * Truncates a title to a specified maximum length, while preserving tagged users.
 *
 * @param title - The title to truncate.
 * @param maxLength - The maximum length of the truncated title.
 * @param locale - The locale to determine the truncation rules. Defaults to 'en'.
 * @returns The truncated title with preserved tagged users.
 */
export const truncateTitle = (
  title: string,
  locale: UserLanguage = UserLanguage.En,
  maxLength: number = 10,
) => {
  if (/^zh/.test(locale)) {
    return truncateTitleForChinese(title, maxLength)
  } else {
    return truncateTitleForEnglish(title, maxLength)
  }
}

/**
 * Truncates a title to a specified maximum length for Chinese (Simplified or traditional) text.
 *
 * @param text - The title to truncate.
 * @param maxWords - The maximum number of words in the truncated title. Defaults to 10.
 * @returns The truncated title.
 */
export function truncateTitleForChinese(text: string, maxWords: number = 10): string {
  const chineseRegex = /[\u4e00-\u9fa5]/g; // to double check
  const chineseWords = text.match(chineseRegex);
  if (chineseWords && chineseWords.length > maxWords) {
    return chineseWords.slice(0, maxWords).join('') + '...';
  }
  return text;
}

/**
 * Truncates a title to a specified maximum length for English text.
 *
 * @param text - The title to truncate.
 * @param maxLength - The maximum length of the truncated title. Defaults to 50.
 * @returns The truncated title.
 */
export function truncateTitleForEnglish(text: string, maxLength: number = 50): string {
  if (text.length > maxLength) {
    const words = text.split(' ');
    let truncatedText = '';
    let count = 0;
    for (const word of words) {
      if (count + word.length <= maxLength) {
        truncatedText += word + ' ';
        count += word.length + 1;
      } else {
        break;
      }
    }
    return truncatedText.trim() + '...';
  }
  return text;
}