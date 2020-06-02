import { Router } from 'next/router'
import { FC, useEffect } from 'react'

import { Button, IconWorld, TextIcon, Translate } from '~/components'

import { analytics } from '~/common/utils'

const TranslationButton: FC<{
  translate: boolean
  setTranslate: (translate: boolean) => void
}> = ({ translate, setTranslate }) => {
  const color = translate ? 'green' : 'grey'

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
        icon={<IconWorld color={color} />}
        size="xs"
        spacing="xxtight"
        color={color}
      >
        <Translate id="translate" />
      </TextIcon>
    </Button>
  )
}

export default TranslationButton
