import { FC } from 'react'

import { Button, IconTranslate16, TextIcon, Translate } from '~/components'

import { analytics } from '~/common/utils'

const TranslationButton: FC<{
  translated: boolean
  toggleTranslate: () => void
}> = ({ translated, toggleTranslate }) => {
  return (
    <Button
      onClick={() => {
        toggleTranslate()
        analytics.trackEvent('click_button', { type: 'translation' })
      }}
    >
      <TextIcon
        icon={<IconTranslate16 color="grey" />}
        size="xs"
        spacing="xxtight"
        color="grey"
      >
        {translated ? (
          <Translate zh_hant="原文（En）" zh_hans="原文（En）" en="Original" />
        ) : (
          <Translate zh_hant="翻譯（繁中）" zh_hans="翻译（简中）" en="Translation" />
        )}
      </TextIcon>
    </Button>
  )
}

export default TranslationButton
