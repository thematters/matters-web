import { UserLanguage } from '~/gql/graphql'

export const toUserLanguage = (lang: string) => {
  lang = lang.toLowerCase().replace(/-/g, '_')

  // zh_hans
  if (['zh_cn', 'zh_hans'].indexOf(lang) >= 0) {
    return UserLanguage.ZhHans
  }

  // zh_hant
  if (['zh', 'zh_tw', 'zh_hk', 'zh_hant'].indexOf(lang) >= 0) {
    return UserLanguage.ZhHant
  }

  // en
  if (lang.startsWith('en')) {
    return UserLanguage.En
  }

  return ''
}

export const toLocale = (lang: string) => {
  lang = lang.toLowerCase().replace(/-/g, '_')

  // zh_hans
  if (['zh_cn', 'zh_hans'].indexOf(lang) >= 0) {
    return 'zh-Hans'
  }

  // zh_hant
  if (['zh', 'zh_tw', 'zh_hk', 'zh_hant'].indexOf(lang) >= 0) {
    return 'zh-Hant'
  }

  // en
  if (lang.startsWith('en')) {
    return 'en'
  }

  return ''
}

export const toOGLanguage = (lang: string) => {
  lang = lang.toLowerCase().replace(/-/g, '_')

  // zh_hans
  if (['zh_cn', 'zh_hans'].indexOf(lang) >= 0) {
    return 'zh_CN'
  }

  // zh_hant
  if (['zh', 'zh_tw', 'zh_hk', 'zh_hant'].indexOf(lang) >= 0) {
    return 'zh_TW'
  }

  // en
  if (lang.startsWith('en')) {
    return 'en'
  }

  return ''
}
