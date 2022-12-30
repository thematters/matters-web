import { useContext } from 'react'

import { UserLanguage } from '@/__generated__/globalTypes'
import { ReactComponent as IconArrowDown } from '@/public/static/icons/8px/arrow-down.svg'
import { LANG_TEXT_MAP, Z_INDEX } from '~/common/enums'
import {
  Button,
  DropdownDialog,
  IconWorld16,
  LanguageConsumer,
  LanguageContext,
  Menu,
  TextIcon,
  Translate,
  withIcon,
} from '~/components'

export const LanguageSwitchContent = ({
  isInDropdown,
}: {
  isInDropdown?: boolean
}) => (
  <LanguageConsumer>
    {({ lang, setLang }) => {
      const isEnActive = lang === 'en'
      const isZhHantActive = lang === 'zh_hant'
      const isZhHansActive = lang === 'zh_hans'

      return (
        <Menu width={isInDropdown ? 'sm' : undefined}>
          <Menu.Item onClick={() => setLang(UserLanguage.zh_hant)}>
            <TextIcon
              spacing="base"
              size="md"
              weight={isZhHantActive ? 'bold' : 'normal'}
            >
              {LANG_TEXT_MAP.zh_hant}
            </TextIcon>
          </Menu.Item>

          <Menu.Item onClick={() => setLang(UserLanguage.zh_hans)}>
            <TextIcon
              spacing="base"
              size="md"
              weight={isZhHansActive ? 'bold' : 'normal'}
            >
              {LANG_TEXT_MAP.zh_hans}
            </TextIcon>
          </Menu.Item>

          <Menu.Item onClick={() => setLang(UserLanguage.en)}>
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
  bgColor?: 'grey-lighter' | 'grey-darkest'
}

export const LanguageSwitch: React.FC<LanguageSwitchProps> = ({
  size = 'sm',
  bgColor = 'grey-lighter',
}) => {
  const { lang } = useContext(LanguageContext)

  const iconColor = bgColor === 'grey-lighter' ? 'grey' : 'white'
  const textSize = size === 'sm' ? 'xs' : 'md'

  return (
    <DropdownDialog
      dropdown={{
        content: <LanguageSwitchContent isInDropdown />,
        placement: 'bottom-end',
        zIndex: Z_INDEX.OVER_DIALOG,
      }}
      dialog={{
        content: <LanguageSwitchContent />,
        title: (
          <Translate
            zh_hant="修改界面語言"
            zh_hans="修改介面语言"
            en="Language"
          />
        ),
      }}
    >
      {({ openDialog, type, ref }) => (
        <Button
          size={[null, size === 'sm' ? '1.25rem' : '1.75rem']}
          spacing={[0, 'xtight']}
          bgColor={bgColor}
          onClick={openDialog}
          aria-haspopup={type}
          ref={ref}
        >
          <TextIcon icon={<IconWorld16 />} size={textSize} color={iconColor}>
            <TextIcon
              icon={withIcon(IconArrowDown)({ size: 'xxs' })}
              size={textSize}
              color={iconColor}
              weight="md"
              spacing="xxtight"
              textPlacement="left"
            >
              {LANG_TEXT_MAP[lang]}
            </TextIcon>
          </TextIcon>
        </Button>
      )}
    </DropdownDialog>
  )
}
