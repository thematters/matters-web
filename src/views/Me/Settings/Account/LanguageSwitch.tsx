import classNames from 'classnames'
import { useContext } from 'react'

import {
  Button,
  Dropdown,
  Icon,
  LanguageConsumer,
  LanguageContext,
  Menu,
  TextIcon
} from '~/components'

import styles from './styles.css'

const textMap = {
  zh_hant: '繁體中文',
  zh_hans: '简体中文',
  en: 'English'
}

export const LanguageSwitch = () => {
  const { lang } = useContext(LanguageContext)

  return (
    <Dropdown content={<DropdownContent />}>
      <Button
        size={[null, '1.5rem']}
        spacing={[0, 'xtight']}
        bgHoverColor="green-lighter"
        aria-haspopup="true"
      >
        <TextIcon icon={<Icon.Expand size="xs" />} textPlacement="left">
          {textMap[lang]}
        </TextIcon>
      </Button>
    </Dropdown>
  )
}

const DropdownContent: React.FC = () => (
  <LanguageConsumer>
    {({ lang, setLang }) => {
      const zhHantClasses = classNames({
        'language-switch-button': true,
        active: lang === 'zh_hant'
      })
      const zhHansClasses = classNames({
        'language-switch-button': true,
        active: lang === 'zh_hans'
      })

      return (
        <Menu width="sm">
          <Menu.Item
            onClick={() => {
              setLang('zh_hant')
            }}
          >
            <span className={zhHantClasses}>{textMap.zh_hant}</span>
          </Menu.Item>

          <Menu.Item
            onClick={() => {
              setLang('zh_hans')
            }}
          >
            <span className={zhHansClasses}>{textMap.zh_hans}</span>
          </Menu.Item>

          <style jsx>{styles}</style>
        </Menu>
      )
    }}
  </LanguageConsumer>
)
