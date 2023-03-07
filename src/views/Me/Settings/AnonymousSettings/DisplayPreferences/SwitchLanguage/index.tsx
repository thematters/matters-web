import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import { LANG_TEXT_MAP } from '~/common/enums'
import {
  DropdownDialog,
  Form,
  LanguageContext,
  LanguageSwitchContent,
} from '~/components'

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
        title: <FormattedMessage defaultMessage="Language" description="" />,
      }}
    >
      {({ openDialog, type, ref }) => (
        <Form.List.Item
          title={<FormattedMessage defaultMessage="Language" description="" />}
          onClick={openDialog}
          rightText={LANG_TEXT_MAP[lang]}
          ariaHasPopup={type}
          role="button"
          ref={ref}
        />
      )}
    </DropdownDialog>
  )
}

export default SwitchLanguage
