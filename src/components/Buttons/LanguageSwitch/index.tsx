import { useContext } from 'react'

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
} from '~/components'
import { UserLanguage } from '~/gql/graphql'

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
          bgActiveColor={bgColor === 'greyDarkest' ? undefined : 'greyLighter'}
          onClick={openDialog}
          aria-haspopup={type}
          ref={ref}
        >
          <TextIcon icon={<IconWorld16 />} size={textSize} color={iconColor}>
            {LANG_TEXT_MAP[lang]}
          </TextIcon>
        </Button>
      )}
    </DropdownDialog>
  )
}
