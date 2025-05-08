import { FC, useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import { ReactComponent as IconTranslate } from '@/public/static/icons/24px/translate.svg'
import { CONTENT_LANG_TEXT_MAP } from '~/common/enums'
import { analytics } from '~/common/utils'
import { Button, Icon, LanguageContext, TextIcon } from '~/components'

const TranslationButton: FC<{
  translated: boolean
  translating: boolean
  toggleTranslate: () => void
  originalLanguage: string
}> = ({ translated, translating, toggleTranslate, originalLanguage }) => {
  const { lang } = useContext(LanguageContext)
  const originalLang = {
    zh_hant:
      originalLanguage in CONTENT_LANG_TEXT_MAP.zh_hant
        ? `（${CONTENT_LANG_TEXT_MAP.zh_hant[originalLanguage as keyof typeof CONTENT_LANG_TEXT_MAP.zh_hant]}）`
        : '',
    zh_hans:
      originalLanguage in CONTENT_LANG_TEXT_MAP.zh_hans
        ? `（${CONTENT_LANG_TEXT_MAP.zh_hans[originalLanguage as keyof typeof CONTENT_LANG_TEXT_MAP.zh_hans]}）`
        : '',
    en:
      originalLanguage in CONTENT_LANG_TEXT_MAP.en
        ? `(${CONTENT_LANG_TEXT_MAP.en[originalLanguage as keyof typeof CONTENT_LANG_TEXT_MAP.en]})`
        : '',
  }

  return (
    <Button
      onClick={() => {
        toggleTranslate()
        analytics.trackEvent('click_button', { type: 'translation' })
      }}
      disabled={translating}
    >
      <TextIcon
        icon={<Icon icon={IconTranslate} color="black" />}
        size={12}
        spacing={2}
        color="black"
      >
        {translating ? (
          <FormattedMessage defaultMessage="Translating..." id="2C42E7" />
        ) : translated ? (
          <FormattedMessage
            defaultMessage={`Original {originalLang}`}
            id="vEdCjn"
            values={{
              originalLang:
                lang === 'zh_hant'
                  ? originalLang.zh_hant
                  : lang === 'zh_hans'
                    ? originalLang.zh_hans
                    : originalLang.en,
            }}
          />
        ) : (
          <FormattedMessage defaultMessage="Translate" id="wCy/Tc" />
        )}
      </TextIcon>
    </Button>
  )
}

export default TranslationButton
