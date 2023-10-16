import { UserLanguage } from '~/gql/graphql'

export const toUserLanguage = (lang: string) => {
  lang = lang.toLowerCase()

  // zh_hans
  if (['zh-cn', 'zh-hans', 'zh_hans'].indexOf(lang) >= 0) {
    return UserLanguage.ZhHans
  }

  // zh_hant
  if (['zh', 'zh-tw', 'zh-hk', 'zh-hant', 'zh_hant'].indexOf(lang) >= 0) {
    return UserLanguage.ZhHant
  }

  // en
  if (['en', 'en-us', 'en-au', 'en-za', 'en-gb'].indexOf(lang) >= 0) {
    return UserLanguage.En
  }

  return ''
}

export const toLocale = (lang: string) => {
  lang = lang.toLowerCase()

  // zh_hans
  if (['zh-cn', 'zh_cn', 'zh-hans', 'zh_hans'].indexOf(lang) >= 0) {
    return 'zh-Hans'
  }

  // zh_hant
  if (
    ['zh', 'zh_tw', 'zh-tw', 'zh_hk', 'zh-hk', 'zh-hant', 'zh_hant'].indexOf(
      lang
    ) >= 0
  ) {
    return 'zh-Hant'
  }

  // en
  if (['en', 'en-us', 'en-au', 'en-za', 'en-gb'].indexOf(lang) >= 0) {
    return 'en'
  }

  return ''
}

export const toOGLanguage = (lang: string) => {
  lang = lang.toLowerCase()

  // zh_hans
  if (['zh-cn', 'zh-hans', 'zh_hans'].indexOf(lang) >= 0) {
    return 'zh_CN'
  }

  // zh_hant
  if (['zh', 'zh-tw', 'zh-hk', 'zh-hant', 'zh_hant'].indexOf(lang) >= 0) {
    return 'zh_TW'
  }

  // en
  if (['en', 'en-us', 'en-au', 'en-za', 'en-gb'].indexOf(lang) >= 0) {
    return 'en'
  }

  return ''
}
