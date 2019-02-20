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
 *
 * // dynamic string with custom data
 * const t = translate<{ index: number }>({
 *   zh_hant: ({ index }) => `項 ${index}`,
 *   zh_hans: ({ index }) => `项 ${index}`,
 *   en: ({ index }) => `Item ${index}`
 *   data: { index: 2 },
 *   lang: 'en'
 * })
 * console.log(t) // Item 2
 *
 * ```
 *
 */

export const translate = <D>({
  lang = 'zh_hant',
  zh_hant,
  zh_hans,
  en,
  ...rest
}: TranslateArgs<D>): string => {
  const translations = { zh_hant, zh_hans, en }
  const t = translations[lang] || translations.zh_hant

  if (typeof t === 'string') {
    return t
  }

  if ('data' in rest) {
    const data = rest.data
    return t(data)
  }

  return 'UNTRANSLATED'
}
