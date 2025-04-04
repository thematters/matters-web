import { useContext } from 'react'

import { ReactComponent as IconWorld } from '@/public/static/icons/24px/world.svg'
import { LANG_TEXT_MAP, Z_INDEX } from '~/common/enums'
import {
  Button,
  ButtonSpacingX,
  ButtonSpacingY,
  Dropdown,
  Icon,
  IconSize,
  LanguageConsumer,
  LanguageContext,
  Media,
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
            onClick={() => setLang(UserLanguage.ZhHans)}
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
  showText?: boolean
}

export const LanguageSwitch: React.FC<LanguageSwitchProps> = ({
  size = 'sm',
  bgColor,
  showText = true,
}) => {
  const { lang } = useContext(LanguageContext)
  const textSize = size === 'sm' ? 12 : 16
  const buttonHeight = size === 'sm' ? '1.25rem' : '1.75rem'
  const buttonSpacing: [ButtonSpacingY, ButtonSpacingX] =
    size === 'sm' ? [0, 0] : [0, 8]

  // Create language switch button with appropriate icon size
  const createLanguageButton = (
    iconSize: IconSize,
    ref: React.Ref<HTMLButtonElement> | undefined,
    openDropdown: () => void
  ) => (
    <Button
      onClick={openDropdown}
      size={[null, buttonHeight]}
      spacing={buttonSpacing}
      bgColor={bgColor}
      aria-haspopup="listbox"
      ref={ref}
    >
      <TextIcon
        icon={<Icon icon={IconWorld} size={iconSize} />}
        size={textSize}
        color="black"
      >
        {showText && LANG_TEXT_MAP[lang]}
      </TextIcon>
    </Button>
  )

  return (
    <Dropdown content={<LanguageSwitchContent />} zIndex={Z_INDEX.OVER_DIALOG}>
      {({ openDropdown, ref }) => (
        <>
          <Media lessThan="md">
            {createLanguageButton(24 as IconSize, ref, openDropdown)}
          </Media>
          <Media greaterThan="sm">
            {createLanguageButton(28 as IconSize, ref, openDropdown)}
          </Media>
        </>
      )}
    </Dropdown>
  )
}
