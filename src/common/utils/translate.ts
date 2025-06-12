import { toLocale } from '~/common/utils'
import { UserLanguage } from '~/gql/graphql'

/**
 *
 * Usage:
 *
 * ```ts
 * // with strings
 * const t = translate<{ index: number }>({
 *   zh_hant: `項`,
 *   zh_hans: `项`,
 *   lang: 'zh_hans'
 * })
 *
 * // with a id of `TEXT`
 * const t = translate<{ index: number }>({
 *   id: 'login',
 *   lang: 'zh_hans'
 * })
 * ```
 *
 */

interface TranslateStrings {
  zh_hant: string
  zh_hans: string
  en?: string
  lang?: Language
}

export type TranslateArgs = TranslateStrings

export const translate = ({ lang, ...props }: TranslateArgs): string => {
  const { zh_hant, zh_hans, en } = props
  const translations = { zh_hant, zh_hans, en }

  const translation = translations[lang || 'zh_hant']

  return typeof translation === 'string' ? translation : translations.zh_hant
}

export async function loadTranslations(lang: UserLanguage) {
  try {
    return import(`@/compiled-lang/${toLocale(lang)}.json`).then(
      (module) => module.default
    )
  } catch {
    throw new Error(
      'Could not load compiled language files. Please run "npm run i18n:compile" first"'
    )
  }
}
