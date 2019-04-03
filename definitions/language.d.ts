type Language = 'zh_hant' | 'zh_hans' | 'en'

// https://www.w3schools.com/tags/ref_language_codes.asp
type HTMLLanguage = 'zh-Hant' | 'zh-Hans' | 'en'

// https://developers.facebook.com/docs/internationalization?locale=en_US#locales
type OGLanguage = 'zh_HK' | 'zh_TW' | 'zh_CN' | 'en'

type TranslateFn<D> = (data: D) => string

type TranslateArgs<D> =
  | {
      zh_hant: string
      zh_hans?: string
      en?: string
      lang?: Language
    }
  | {
      zh_hant: TranslateFn<D>
      zh_hans?: TranslateFn<D>
      en?: TranslateFn<D>
      lang?: Language
      data: D
    }
