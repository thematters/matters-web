import classNames from 'classnames'
import { useContext, useState } from 'react'

import {
  Button,
  Dropdown,
  Icon,
  Menu,
  PopperInstance,
  TextIcon
} from '~/components'
import { LanguageConsumer, LanguageContext } from '~/components/Language'

import styles from './styles.css'

const textMap = {
  zh_hant: '繁體中文',
  zh_hans: '简体中文',
  en: 'English'
}

export const LanguageSwitch = () => {
  const { lang } = useContext(LanguageContext)
  const [instance, setInstance] = useState<PopperInstance | null>(null)
  const hideDropdown = () => {
    if (!instance) {
      return
    }
    instance.hide()
  }

  return (
    <Dropdown
      content={<DropdownContent hideDropdown={hideDropdown} />}
      trigger="click"
      onCreate={setInstance}
    >
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

const DropdownContent: React.FC<{ hideDropdown: () => void }> = ({
  hideDropdown
}) => (
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
          <Menu.Item>
            <button
              type="button"
              className={zhHantClasses}
              onClick={() => {
                setLang('zh_hant')
                hideDropdown()
              }}
            >
              {textMap.zh_hant}
            </button>
          </Menu.Item>

          <Menu.Item>
            <button
              type="button"
              className={zhHansClasses}
              onClick={() => {
                setLang('zh_hans')
                hideDropdown()
              }}
            >
              {textMap.zh_hans}
            </button>
          </Menu.Item>

          <style jsx>{styles}</style>
        </Menu>
      )
    }}
  </LanguageConsumer>
)
