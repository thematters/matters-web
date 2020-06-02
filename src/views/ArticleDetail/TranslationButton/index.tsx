import { Router } from 'next/router'
import { FC, useEffect } from 'react'

import { Button, IconWorld, TextIcon, Translate } from '~/components'

import { analytics } from '~/common/utils'

const TranslationButton: FC<{
  translate: boolean
  setTranslate: (translate: boolean) => void
}> = ({ translate, setTranslate }) => {
  useEffect(() => {
    Router.events.on('routeChangeStart', () => setTranslate(false))
  }, [])

  return (
    <Button
      onClick={() => {
        setTranslate(!translate)
        analytics.trackEvent('click_button', { type: 'translation' })
      }}
    >
      <TextIcon
        icon={<IconWorld color="grey" />}
        size="xs"
        spacing="xxtight"
        color="grey"
        key={translate + ''}
      >
        {translate ? (
          <Translate zh_hant="原文" zh_hans="原文" />
        ) : (
          <Translate zh_hant="翻譯" zh_hans="翻译" />
        )}
      </TextIcon>
    </Button>
  )
}

export default TranslationButton
