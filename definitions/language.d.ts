type Language = 'zh_hant' | 'zh_hans' | 'en'

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
