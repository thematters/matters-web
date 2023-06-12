import { IconSettings24 } from '~/components'

import { SetPublishISCNProps } from '../..'
import ToggleAccess, { ToggleAccessProps } from '../../ToggleAccess'
import Box from '../Box'
import styles from './styles.module.css'

export type SidebarManagementProps = ToggleAccessProps & SetPublishISCNProps

const SidebarManagement: React.FC<SidebarManagementProps> = (props) => {
  return (
    <Box icon={<IconSettings24 size="md" />} title="articleManagement">
      <section className={styles.container}>
        <ToggleAccess {...props} inSidebar />
      </section>
    </Box>
  )
}

export default SidebarManagement
