/**
 *
 * Usage:
 *
 * ```ts
 * const t = translate<{ index: number }>({
 *   zh_hant: `項`,
 *   zh_hans: `项`,
 *   lang: 'zh_hans'
 * })
 * ```
 *
 */
export const translate = ({
  lang = 'zh_hant',
  zh_hant,
  zh_hans,
  en
}: TranslateArgs): string => {
  const translations = { zh_hant, zh_hans, en }
  const t = translations[lang] || translations.zh_hant
  return t
}
