import { FC, useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import IconTranslate from '@/public/static/icons/24px/translate.svg'
import { CONTENT_LANG_TEXT_MAP } from '~/common/enums'
import { analytics } from '~/common/utils'
import { Button, Icon, LanguageContext, TextIcon } from '~/components'
import { TranslationModel } from '~/gql/graphql'

import styles from '../styles.module.css'

const TranslationButton: FC<{
  translated: boolean
  translating: boolean
  toggleTranslate: () => void
  originalLanguage: string
  model?: TranslationModel | null
}> = ({
  translated,
  translating,
  toggleTranslate,
  originalLanguage,
  model,
}) => {
  const { lang } = useContext(LanguageContext)
  const originalLang = {
    zh_hant:
      originalLanguage in CONTENT_LANG_TEXT_MAP.zh_hant
        ? `${CONTENT_LANG_TEXT_MAP.zh_hant[originalLanguage as keyof typeof CONTENT_LANG_TEXT_MAP.zh_hant]}`
        : '',
    zh_hans:
      originalLanguage in CONTENT_LANG_TEXT_MAP.zh_hans
        ? `${CONTENT_LANG_TEXT_MAP.zh_hans[originalLanguage as keyof typeof CONTENT_LANG_TEXT_MAP.zh_hans]}`
        : '',
    en:
      originalLanguage in CONTENT_LANG_TEXT_MAP.en
        ? `${CONTENT_LANG_TEXT_MAP.en[originalLanguage as keyof typeof CONTENT_LANG_TEXT_MAP.en]}`
        : '',
  }
  const targetLang = {
    zh_hant: CONTENT_LANG_TEXT_MAP[lang].zh_hant,
    zh_hans: CONTENT_LANG_TEXT_MAP[lang].zh_hans,
    en: CONTENT_LANG_TEXT_MAP[lang].en,
  }
  const modelText = {
    [TranslationModel.GoogleGemini_2_0Flash]: 'Gemini',
    [TranslationModel.GoogleGemini_2_5Flash]: 'Gemini',
    [TranslationModel.GoogleTranslationV2]: 'Google Translate',
    [TranslationModel.Opencc]: 'OpenCC',
  }

  const isTranslated = translated && !translating

  if (isTranslated) {
    return (
      <span className={styles.translated}>
        <Icon icon={IconTranslate} />
        <span className={styles.target}>
          {targetLang[lang]} (via{' '}
          {modelText[model || TranslationModel.GoogleTranslationV2]})
        </span>
        <Button
          className={styles.origin}
          onClick={() => {
            toggleTranslate()
            analytics.trackEvent('click_button', {
              type: 'translation',
              pageType: 'article_detail',
              note: JSON.stringify({
                type: 'revert',
                from: lang,
                to: originalLanguage,
              }),
            })
          }}
        >
          <FormattedMessage
            defaultMessage="Show Original ({originalLang})"
            id="r9fhGr"
            values={{ originalLang: originalLang[lang] }}
          />
        </Button>
      </span>
    )
  }

  return (
    <Button
      onClick={() => {
        toggleTranslate()

        analytics.trackEvent('click_button', {
          type: 'translation',
          pageType: 'article_detail',
          note: JSON.stringify({
            type: 'translate',
            from: originalLanguage,
            to: lang,
          }),
        })
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
        ) : (
          <FormattedMessage defaultMessage="Translate" id="wCy/Tc" />
        )}
      </TextIcon>
    </Button>
  )
}

export default TranslationButton
