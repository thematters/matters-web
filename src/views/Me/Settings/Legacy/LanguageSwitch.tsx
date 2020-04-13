import { useContext } from 'react'

import {
  Button,
  DropdownDialog,
  Icon,
  LanguageConsumer,
  LanguageContext,
  Menu,
  TextIcon,
  Translate,
} from '~/components'

const textMap = {
  zh_hant: '繁體中文',
  zh_hans: '简体中文',
  en: 'English',
}

const Content = ({ isInDropdown }: { isInDropdown?: boolean }) => (
  <LanguageConsumer>
    {({ lang, setLang }) => {
      const isZhHantActive = lang === 'zh_hant'
      const isZhHansActive = lang === 'zh_hans'

      return (
        <Menu width={isInDropdown ? 'sm' : undefined}>
          <Menu.Item
            onClick={() => {
              setLang('zh_hant')
            }}
          >
            <TextIcon
              spacing="base"
              size="md"
              weight={isZhHantActive ? 'bold' : 'normal'}
            >
              {textMap.zh_hant}
            </TextIcon>
          </Menu.Item>

          <Menu.Item
            onClick={() => {
              setLang('zh_hans')
            }}
          >
            <TextIcon
              spacing="base"
              size="md"
              weight={isZhHansActive ? 'bold' : 'normal'}
            >
              {textMap.zh_hans}
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
        content: <Content isInDropdown />,
      }}
      dialog={{
        content: <Content />,
        title: <Translate zh_hant="修改界面語言" zh_hans="修改介面语言" />,
      }}
    >
      {({ open, ref }) => (
        <Button
          size={[null, '1.5rem']}
          spacing={[0, 'xtight']}
          bgActiveColor="grey-lighter"
          aria-haspopup="true"
          onClick={open}
          ref={ref}
        >
          <TextIcon icon={<Icon.Expand size="xs" />} textPlacement="left">
            {textMap[lang]}
          </TextIcon>
        </Button>
      )}
    </DropdownDialog>
  )
}
