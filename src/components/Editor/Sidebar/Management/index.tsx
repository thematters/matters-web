import { FormattedMessage } from 'react-intl'

import { ReactComponent as IconSettings } from '@/public/static/icons/24px/settings.svg'
import { Icon } from '~/components'

import { SetPublishISCNProps } from '../..'
import ToggleAccess, { ToggleAccessProps } from '../../ToggleAccess'
import Box from '../Box'
import styles from './styles.module.css'

export type SidebarManagementProps = ToggleAccessProps & SetPublishISCNProps

const SidebarManagement: React.FC<SidebarManagementProps> = (props) => {
  return (
    <Box
      icon={<Icon icon={IconSettings} size="md" />}
      title={
        <FormattedMessage defaultMessage="Article Management" id="ZEMcZ6" />
      }
    >
      <section className={styles.container}>
        <ToggleAccess {...props} inSidebar />
      </section>
    </Box>
  )
}

export default SidebarManagement
