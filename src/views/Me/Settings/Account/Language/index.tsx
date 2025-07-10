import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import IconWorld from '@/public/static/icons/24px/world.svg'
import { LANG_TEXT_MAP } from '~/common/enums'
import {
  Dropdown,
  Icon,
  LanguageContext,
  LanguageSwitchContent,
  TableView,
  TextIcon,
} from '~/components'

const Language = () => {
  const { lang } = useContext(LanguageContext)

  return (
    <Dropdown content={<LanguageSwitchContent />}>
      {({ openDropdown, ref }) => (
        <TableView.Cell
          title={
            <TextIcon icon={<Icon icon={IconWorld} size={22} />} spacing={12}>
              <FormattedMessage
                defaultMessage="Language"
                id="BnMru1"
                description="src/views/Me/Settings/Misc/Language.tsx"
              />
            </TextIcon>
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
