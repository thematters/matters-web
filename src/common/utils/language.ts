import { UserLanguage } from '@/__generated__/globalTypes'

export const toUserLanguage = (lang: string) => {
  lang = lang.toLowerCase()

  // zh_hans
  if (['zh-cn', 'zh-hans', 'zh_hans'].indexOf(lang) >= 0) {
    return UserLanguage.zh_hans
  }

  // zh_hant
  if (['zh', 'zh-tw', 'zh-hk', 'zh-hant', 'zh_hant'].indexOf(lang) >= 0) {
    return UserLanguage.zh_hant
  }

  // en
  if (['en', 'en-us', 'en-au', 'en-za', 'en-gb'].indexOf(lang) >= 0) {
    return UserLanguage.en
  }

  return ''
}

export const toLocale = (lang: string) => {
  lang = lang.toLowerCase()

  // zh_hans
  if (['zh-cn', 'zh-hans', 'zh_hans'].indexOf(lang) >= 0) {
    return 'zh-Hans'
  }

  // zh_hant
  if (['zh', 'zh-tw', 'zh-hk', 'zh-hant', 'zh_hant'].indexOf(lang) >= 0) {
    return 'zh-Hant'
  }

  // en
  if (['en', 'en-us', 'en-au', 'en-za', 'en-gb'].indexOf(lang) >= 0) {
    return 'en'
  }

  return ''
}
