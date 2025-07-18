import { FormattedMessage, useIntl } from 'react-intl'

import IconDown from '@/public/static/icons/24px/down.svg'
import { Icon } from '~/components'

import Box from '../Box'

export type SidebarSupportSettingProps = {
  openSupportSetting: () => void
}

const SidebarSupportSetting: React.FC<SidebarSupportSettingProps> = ({
  openSupportSetting,
}) => {
  const intl = useIntl()

  return (
    <Box
      title={<FormattedMessage defaultMessage="Support Settings" id="zw4KNU" />}
      subtitle={
        <FormattedMessage
          defaultMessage="Custom Call-to-Support and Thank-you card"
          id="FLGK+W"
        />
      }
      rightButton={
        <button
          onClick={openSupportSetting}
          aria-label={intl.formatMessage({
            defaultMessage: 'Edit',
            id: 'wEQDC6',
          })}
        >
          <Icon icon={IconDown} size={24} color="black" />
        </button>
      }
    />
  )
}

export default SidebarSupportSetting
