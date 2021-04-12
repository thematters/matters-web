import { FC } from 'react'

import { Button, IconWorld16, TextIcon, Translate } from '~/components'

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
        icon={<IconWorld16 color="grey" />}
        size="xs"
        spacing="xxtight"
        color="grey"
      >
        {translated ? (
          <Translate zh_hant="原文" zh_hans="原文" en="Original" />
        ) : (
          <Translate zh_hant="翻譯" zh_hans="翻译" en="Translation" />
        )}
      </TextIcon>
    </Button>
  )
}

export default TranslationButton
