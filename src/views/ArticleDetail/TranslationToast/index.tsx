import { CONTENT_LANG_TEXT_MAP } from '~/common/enums'
import { toLocale } from '~/common/utils'
import { Translate } from '~/components'

const Content = ({ language }: { language?: string | null }) => {
  if (language && toLocale(language) !== '') {
    const targetLang = {
      zh_hant: '',
      zh_hans: '',
      en: '',
    }
    Object.entries(CONTENT_LANG_TEXT_MAP.zh_hant).forEach(([k, v]) => {
      if (k === language) targetLang.zh_hant = v
    })
    Object.entries(CONTENT_LANG_TEXT_MAP.zh_hans).forEach(([k, v]) => {
      if (k === language) targetLang.zh_hans = v
    })
    Object.entries(CONTENT_LANG_TEXT_MAP.en).forEach(([k, v]) => {
      if (k === language) targetLang.en = v
    })
    return (
      <Translate
        zh_hans={`你正在浏览由 Google 翻译的${targetLang.zh_hans}版本`}
        zh_hant={`你正在瀏覽由 Google 翻譯的${targetLang.zh_hant}版本`}
        en={`You’re viewing content translated into ${targetLang.en} by Google.`}
      />
    )
  }
  return (
    <Translate
      zh_hans="你正在浏览由 Google 翻译的版本"
      zh_hant="你正在瀏覽由 Google 翻譯的版本"
      en="You’re viewing content translated by Google."
    />
  )
}

const TranslationToast = {
  Content,
}

export default TranslationToast
