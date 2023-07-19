import { useContext } from 'react'

import { LANG_TEXT_MAP } from '~/common/enums'
import {
  Dropdown,
  Form,
  LanguageContext,
  LanguageSwitchContent,
  Translate,
} from '~/components'

const SwitchLanguage = () => {
  const { lang } = useContext(LanguageContext)

  return (
    <Dropdown content={<LanguageSwitchContent />}>
      {({ openDropdown, ref }) => (
        <Form.List.Item
          onClick={openDropdown}
          title={<Translate id="settingsLanguage" />}
          rightText={LANG_TEXT_MAP[lang]}
          aria-haspopup="listbox"
          role="button"
          ref={ref}
        />
      )}
    </Dropdown>
  )
}

export default SwitchLanguage
