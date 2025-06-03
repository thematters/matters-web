import { useContext } from 'react'

import IconWorld from '@/public/static/icons/24px/world.svg'
import { LANG_TEXT_MAP, Z_INDEX } from '~/common/enums'
import {
  Button,
  Dropdown,
  Icon,
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
        <Menu>
          <Menu.Item
            text={LANG_TEXT_MAP.zh_hant}
            onClick={() => setLang(UserLanguage.ZhHant)}
            weight={isZhHantActive ? 'bold' : 'normal'}
          />

          <Menu.Item
            text={LANG_TEXT_MAP.zh_hans}
            onClick={() => {
              setLang(UserLanguage.ZhHans)
            }}
            weight={isZhHansActive ? 'bold' : 'normal'}
          />

          <Menu.Item
            text={LANG_TEXT_MAP.en}
            onClick={() => setLang(UserLanguage.En)}
            weight={isEnActive ? 'bold' : 'normal'}
          />
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
  const textSize = size === 'sm' ? 12 : 16

  return (
    <Dropdown content={<LanguageSwitchContent />} zIndex={Z_INDEX.OVER_DIALOG}>
      {({ openDropdown, ref }) => (
        <Button
          onClick={openDropdown}
          size={[null, size === 'sm' ? '1.25rem' : '1.75rem']}
          spacing={size === 'sm' ? [0, 0] : [0, 8]}
          bgColor={bgColor}
          aria-haspopup="listbox"
          ref={ref}
        >
          <TextIcon
            icon={<Icon icon={IconWorld} />}
            size={textSize}
            color={iconColor}
          >
            {LANG_TEXT_MAP[lang]}
          </TextIcon>
        </Button>
      )}
    </Dropdown>
  )
}
