import { useContext } from 'react'

import {
  DropdownDialog,
  Form,
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
        </Menu>
      )
    }}
  </LanguageConsumer>
)

const SwitchLanguage = () => {
  const { lang } = useContext(LanguageContext)

  return (
    <DropdownDialog
      dropdown={{
        content: <LanguageSwitchContent isInDropdown />,
        placement: 'bottom-end',
      }}
      dialog={{
        content: <LanguageSwitchContent />,
        title: <Translate zh_hant="修改界面語言" zh_hans="修改介面语言" />,
      }}
    >
      {({ open, ref }) => (
        <Form.List.Item
          title={<Translate id="settingsLanguage" />}
          onClick={open}
          rightText={LANG_TEXT_MAP[lang]}
          ref={ref}
        />
      )}
    </DropdownDialog>
  )
}

export default SwitchLanguage
