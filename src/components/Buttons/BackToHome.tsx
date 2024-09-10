import { useContext } from 'react'

import { ReactComponent as IconLogo } from '@/public/static/icons/logo.svg'
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
        icon={IconLogo}
        style={{ width: 76, height: 16, left: 0, top: 0 }}
        color="greyLight"
      />
    </Button>
  )
}
