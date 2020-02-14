import { useContext } from 'react'

import {
  Button,
  DropdownDialog,
  Icon,
  LanguageConsumer,
  LanguageContext,
  Menu,
  TextIcon,
  Translate
} from '~/components'

const textMap = {
  zh_hant: '繁體中文',
  zh_hans: '简体中文',
  en: 'English'
}

interface ContentProps {
  type: 'dialog' | 'dropdown'
}

const Content = ({ type }: ContentProps) => (
  <LanguageConsumer>
    {({ lang, setLang }) => {
      const isZhHantActive = lang === 'zh_hant'
      const isZhHansActive = lang === 'zh_hans'
      const isDropdown = type === 'dropdown'

      return (
        <Menu width={isDropdown ? 'sm' : undefined}>
          <Menu.Item
            onClick={() => {
              setLang('zh_hant')
            }}
          >
            <TextIcon
              spacing="base"
              size="md"
              weight={isZhHantActive ? 'bold' : undefined}
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
              weight={isZhHansActive ? 'bold' : undefined}
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
        content: <Content type="dropdown" />
      }}
      dialog={{
        content: <Content type="dialog" />,
        title: <Translate zh_hant="修改界面語言" zh_hans="修改介面语言" />,
        showHeader: false
      }}
    >
      {({ open, ref }) => (
        <Button
          size={[null, '1.5rem']}
          spacing={[0, 'xtight']}
          bgHoverColor="green-lighter"
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
