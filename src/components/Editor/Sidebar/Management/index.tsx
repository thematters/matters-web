import { FormattedMessage } from 'react-intl'

import IconSettings from '@/public/static/icons/24px/settings.svg'
import { Icon } from '~/components'

import { SetPublishISCNProps } from '../..'
import MoreSettings, { MoreSettingsProps } from '../../MoreSettings'
import Box from '../Box'
import styles from './styles.module.css'

export type SidebarManagementProps = MoreSettingsProps & SetPublishISCNProps

const SidebarManagement: React.FC<SidebarManagementProps> = (props) => {
  return (
    <Box
      icon={<Icon icon={IconSettings} size={24} />}
      title={
        <FormattedMessage defaultMessage="Article Management" id="ZEMcZ6" />
      }
    >
      <section className={styles.container}>
        <MoreSettings {...props} theme="sidebar" />
      </section>
    </Box>
  )
}

export default SidebarManagement
