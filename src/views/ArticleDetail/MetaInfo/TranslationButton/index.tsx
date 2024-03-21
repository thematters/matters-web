import { FC } from 'react'

import { CONTENT_LANG_TEXT_MAP } from '~/common/enums'
import { analytics } from '~/common/utils'
import { Button, IconTranslate16, TextIcon, Translate } from '~/components'

const TranslationButton: FC<{
  translated: boolean
  toggleTranslate: () => void
  originalLanguage: string
}> = ({ translated, toggleTranslate, originalLanguage }) => {
  const originalLang = {
    zh_hant: '',
    zh_hans: '',
    en: '',
  }
  Object.entries(CONTENT_LANG_TEXT_MAP.zh_hant).forEach(([k, v]) => {
    if (k === originalLanguage) originalLang.zh_hant = `（${v}）`
  })
  Object.entries(CONTENT_LANG_TEXT_MAP.zh_hans).forEach(([k, v]) => {
    if (k === originalLanguage) originalLang.zh_hans = `（${v}）`
  })
  Object.entries(CONTENT_LANG_TEXT_MAP.en).forEach(([k, v]) => {
    if (k === originalLanguage) originalLang.en = ` (${v})`
  })

  return (
    <Button
      onClick={() => {
        toggleTranslate()
        analytics.trackEvent('click_button', { type: 'translation' })
      }}
    >
      <TextIcon
        icon={<IconTranslate16 color="black" />}
        size="xs"
        spacing="xxxtight"
        color="black"
      >
        {translated ? (
          <Translate
            zh_hant={`原文${originalLang.zh_hant}`}
            zh_hans={`原文${originalLang.zh_hans}`}
            en={`Original${originalLang.en}`}
          />
        ) : (
          <Translate zh_hant="翻譯" zh_hans="翻译" en="Translate" />
        )}
      </TextIcon>
    </Button>
  )
}

export default TranslationButton
