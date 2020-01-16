import classNames from 'classnames'
import { useContext, useState } from 'react'

import { Dropdown, Icon, Menu, PopperInstance, TextIcon } from '~/components'
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
      <button type="button" className="sort-button">
        <TextIcon
          icon={<Icon.Expand style={{ width: 6, height: 10 }} />}
          spacing="xtight"
          text={textMap[lang]}
          textPlacement="left"
        />
      </button>
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
        <Menu>
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
