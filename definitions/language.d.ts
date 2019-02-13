type Language = 'zh_hant' | 'zh_hans' | 'en'

type TranslateFn<D> = (data: D) => string

interface TranslationsStr {
  zh_hant: string
  zh_hans?: string
  en?: string
}

interface TranslationsFn<D> {
  zh_hant: TranslateFn<D>
  zh_hans?: TranslateFn<D>
  en?: TranslateFn<D>
}

type TranslateArgs<D> =
  | {
      translations: TranslationsStr
      lang?: Language
    }
  | {
      translations: TranslationsFn<D>
      lang?: Language
      data: D
    }
