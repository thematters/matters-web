import { useContext } from 'react'

import { DropdownDialog, Form, LanguageContext, Translate } from '~/components'

import { LANG_TEXT_MAP } from '~/common/enums'

import LanguageSwitchContent from './LanguageSwitchContent'

const UISettings = () => {
  const { lang } = useContext(LanguageContext)

  return (
    <Form.List groupName={<Translate id="settingsUI" />}>
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
    </Form.List>
  )
}

export default UISettings
