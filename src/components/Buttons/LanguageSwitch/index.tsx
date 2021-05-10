import { useContext } from 'react'

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

import { LANG_TEXT_MAP } from '~/common/enums'

const LanguageSwitchContent = ({
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
          <Menu.Item onClick={() => setLang('zh_hant')}>
            <TextIcon
              spacing="base"
              size="md"
              weight={isZhHantActive ? 'bold' : 'normal'}
            >
              {LANG_TEXT_MAP.zh_hant}
            </TextIcon>
          </Menu.Item>

          <Menu.Item onClick={() => setLang('zh_hans')}>
            <TextIcon
              spacing="base"
              size="md"
              weight={isZhHansActive ? 'bold' : 'normal'}
            >
              {LANG_TEXT_MAP.zh_hans}
            </TextIcon>
          </Menu.Item>

          <Menu.Item onClick={() => setLang('en')}>
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

export const LanguageSwitch = () => {
  const { lang } = useContext(LanguageContext)

  return (
    <DropdownDialog
      dropdown={{
        content: <LanguageSwitchContent isInDropdown />,
        placement: 'bottom-end',
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
      {({ open, ref }) => (
        <Button
          size={[null, '1.25rem']}
          spacing={[0, 'xtight']}
          bgColor="grey-lighter"
          onClick={open}
          ref={ref}
        >
          <TextIcon
            icon={<IconWorld16 size="xs" />}
            size="xs"
            color="grey"
            weight="md"
          >
            {LANG_TEXT_MAP[lang]}
          </TextIcon>
        </Button>
      )}
    </DropdownDialog>
  )
}
