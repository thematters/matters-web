import { FormattedMessage, useIntl } from 'react-intl'

import IconDown from '@/public/static/icons/24px/down.svg'
import { Icon } from '~/components'

import Box from '../Box'
import styles from './styles.module.css'

export type SidebarSupportSettingProps = {
  openSupportSetting: () => void
}

const SidebarSupportSetting: React.FC<SidebarSupportSettingProps> = ({
  openSupportSetting,
}) => {
  const intl = useIntl()

  return (
    <button
      onClick={openSupportSetting}
      aria-label={intl.formatMessage({
        defaultMessage: 'Edit',
        id: 'wEQDC6',
      })}
      className={styles.openDialogButton}
    >
      <Box
        title={
          <FormattedMessage defaultMessage="Support Settings" id="zw4KNU" />
        }
        subtitle={
          <FormattedMessage
            defaultMessage="Custom Call-to-Support and Thank-you card"
            id="FLGK+W"
          />
        }
        rightButton={<Icon icon={IconDown} size={24} color="black" />}
      />
    </button>
  )
}

export default SidebarSupportSetting
