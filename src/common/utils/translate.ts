import _get from 'lodash/get'

import { TEXT, TextId } from '~/common/enums'

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
  zh_hans?: string
  en?: string
  lang?: Language
}

interface TranslateKey {
  id: TextId
  lang?: Language
}

export type TranslateArgs = TranslateStrings | TranslateKey

export const translate = ({ lang, ...props }: TranslateArgs): string => {
  let translations: { zh_hant: string; zh_hans?: string; en?: string }

  if ('id' in props) {
    const { id } = props
    translations = {
      zh_hant: TEXT.zh_hant[id],
      zh_hans: TEXT.zh_hans[id]
    }
  } else {
    const { zh_hant, zh_hans, en } = props
    translations = { zh_hant, zh_hans, en }
  }

  return translations[lang || 'zh_hant'] || translations.zh_hant
}
