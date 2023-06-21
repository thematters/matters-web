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
      {({ ref }) => (
        <Form.List.Item
          title={<Translate id="settingsLanguage" />}
          onClick={() => {}} // FIXME: show arrow
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
