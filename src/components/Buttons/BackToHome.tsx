import { useContext } from 'react'

import { ReactComponent as IconLogoMobile } from '@/public/static/icons/logo-mobile.svg'
import { PATHS } from '~/common/enums'
import { Button, Icon, LanguageContext, TextIcon } from '~/components'
import { UserLanguage } from '~/gql/graphql'

export const BackToHomeButton = () => {
  const { lang } = useContext(LanguageContext)

  // FIXME: cannot use <FormattedMessage> here cuz it's outer of <TranslationProvider>
  const text =
    lang === UserLanguage.En
      ? 'Back to discovery'
      : lang === UserLanguage.ZhHans
      ? '返回发现'
      : '返回發現'

  return (
    <Button size={['10.5rem', '2.25rem']} bgColor="green" href={PATHS.HOME}>
      <TextIcon color="white" weight="medium">
        {text}
      </TextIcon>
    </Button>
  )
}

// display a back to home button on mobile
export const BackToHomeMobileButton = () => {
  return (
    <Button href="/">
      <Icon
        icon={IconLogoMobile}
        style={{ width: 343, height: 51, padding: 20 }}
      />
    </Button>
  )
}
