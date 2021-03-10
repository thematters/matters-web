import { UserLanguage } from '@/__generated__/globalTypes'

export const langConvert = {
  og2html: (lang: OGLanguage): HTMLLanguage => {
    return ({
      zh_HK: 'zh-Hant',
      zh_TW: 'zh-Hant',
      zh_CN: 'zh-Hans',
      en: 'en',
    }[lang] || 'zh-Hant') as HTMLLanguage
  },
  sys2html: (lang: Language): HTMLLanguage => {
    return ({
      zh_hans: 'zh-Hans',
      zh_hant: 'zh-Hant',
      en: 'en',
    }[lang] || 'zh-Hant') as HTMLLanguage
  },
  html2sys: (lang: HTMLLanguage): Language => {
    return ({
      'zh-Hans': UserLanguage.zh_hans,
      'zh-Hant': UserLanguage.zh_hant,
      en: UserLanguage.en,
    }[lang] || UserLanguage.zh_hant) as Language
  },
  sys2Og: (lang: Language): OGLanguage => {
    return ({
      zh_hant: 'zh-HK',
      zh_hans: 'zh-CN',
      en: 'en',
    }[lang] || 'zh_HK') as OGLanguage
  },
  bcp472sys: (Lang: string): UserLanguage => {
    const lang = Lang.toLowerCase()
    if (lang === 'zh' || lang === 'zh-cn') {
      return UserLanguage.zh_hans
    }

    if (lang.startsWith('en')) {
      return UserLanguage.en
    }

    return UserLanguage.zh_hant
  },
}
