import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import { LANG_TEXT_MAP } from '~/common/enums'
import {
  Dropdown,
  Form,
  LanguageContext,
  LanguageSwitchContent,
} from '~/components'

const Language = () => {
  const { lang } = useContext(LanguageContext)

  return (
    <Dropdown content={<LanguageSwitchContent />}>
      {({ openDropdown, ref }) => (
        <Form.List.Item
          title={
            <FormattedMessage
              defaultMessage="Language"
              description="src/views/Me/Settings/Misc/Language.tsx"
            />
          }
          rightText={LANG_TEXT_MAP[lang]}
          onClick={openDropdown}
          aria-haspopup="listbox"
          role="button"
          ref={ref}
        />
      )}
    </Dropdown>
  )
}

export default Language
