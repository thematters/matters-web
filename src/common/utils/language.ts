import { UserLanguage } from '@/__generated__/globalTypes'

export const langConvert = {
  bcp47toSys: (Lang: string): UserLanguage => {
    const lang = Lang.toLowerCase()

    if (lang === 'zh-cn') {
      return UserLanguage.zh_hans
    }

    if (lang.startsWith('en')) {
      return UserLanguage.en
    }

    return UserLanguage.zh_hant
  },
}
