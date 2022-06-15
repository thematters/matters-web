import { FC } from 'react'

import { Button, IconTranslate16, TextIcon, Translate } from '~/components'

import { analytics } from '~/common/utils'

const TranslationButton: FC<{
  translated: boolean
  toggleTranslate: () => void
  originalLanguage: string
}> = ({ translated, toggleTranslate, originalLanguage}) => {
  const languages = new Map([
    ['zh_hant', '繁中'],
    ['zh_hans', '简中'],
    ['en', 'En'],
    ['vi', 'Việt'],
    ['ja', '日本語'],
    ['ru', 'Русский'],
  ])
  const originalLang = languages.get(originalLanguage)
  const buttonLabelZh = originalLang? `原文（${originalLang}）`: '原文'
  const buttonLabelEn = originalLang? `Original（${originalLang}）`: 'Original'

  return (
    <Button
      onClick={() => {
        toggleTranslate()
        analytics.trackEvent('click_button', { type: 'translation' })
      }}
      spacing={['xxtight', 'xtight']}
      bgColor="green-lighter"
    >
      <TextIcon
        icon={<IconTranslate16 color="green" />}
        size="xs"
        spacing="xxtight"
        color="green"
      >
        {translated ? (
          <Translate zh_hant={buttonLabelZh} zh_hans={buttonLabelZh} en={buttonLabelEn} />
        ) : (
          <Translate
            zh_hant="翻譯"
            zh_hans="翻译"
            en="Translation"
          />
        )}
      </TextIcon>
    </Button>
  )
}

export default TranslationButton
