import { useContext } from 'react'

import { LANG_TEXT_MAP, Z_INDEX } from '~/common/enums'
import {
  Button,
  Dropdown,
  IconWorld16,
  LanguageConsumer,
  LanguageContext,
  Menu,
  TextIcon,
} from '~/components'
import { UserLanguage } from '~/gql/graphql'

export const LanguageSwitchContent = () => (
  <LanguageConsumer>
    {({ lang, setLang }) => {
      const isEnActive = lang === 'en'
      const isZhHantActive = lang === 'zh_hant'
      const isZhHansActive = lang === 'zh_hans'

      return (
        <Menu width="sm">
          <Menu.Item onClick={() => setLang(UserLanguage.ZhHant)}>
            <TextIcon
              spacing="base"
              size="md"
              weight={isZhHantActive ? 'bold' : 'normal'}
            >
              {LANG_TEXT_MAP.zh_hant}
            </TextIcon>
          </Menu.Item>

          <Menu.Item onClick={() => setLang(UserLanguage.ZhHans)}>
            <TextIcon
              spacing="base"
              size="md"
              weight={isZhHansActive ? 'bold' : 'normal'}
            >
              {LANG_TEXT_MAP.zh_hans}
            </TextIcon>
          </Menu.Item>

          <Menu.Item onClick={() => setLang(UserLanguage.En)}>
            <TextIcon
              spacing="base"
              size="md"
              weight={isEnActive ? 'bold' : 'normal'}
            >
              {LANG_TEXT_MAP.en}
            </TextIcon>
          </Menu.Item>
        </Menu>
      )
    }}
  </LanguageConsumer>
)

type LanguageSwitchProps = {
  size?: 'sm' | 'lg'
  bgColor?: 'greyDarkest'
}

export const LanguageSwitch: React.FC<LanguageSwitchProps> = ({
  size = 'sm',
  bgColor,
}) => {
  const { lang } = useContext(LanguageContext)

  const iconColor = bgColor === 'greyDarkest' ? 'white' : 'grey'
  const textSize = size === 'sm' ? 'smS' : 'md'

  return (
    <Dropdown content={<LanguageSwitchContent />} zIndex={Z_INDEX.OVER_DIALOG}>
      {({ ref }) => (
        <Button
          size={[null, size === 'sm' ? '1.25rem' : '1.75rem']}
          spacing={[0, 'xtight']}
          bgColor={bgColor}
          bgActiveColor={bgColor === 'greyDarkest' ? undefined : 'greyLighter'}
          aria-haspopup="listbox"
          ref={ref}
        >
          <TextIcon icon={<IconWorld16 />} size={textSize} color={iconColor}>
            {LANG_TEXT_MAP[lang]}
          </TextIcon>
        </Button>
      )}
    </Dropdown>
  )
}
