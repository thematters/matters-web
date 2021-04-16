import { IconCircle24 } from '~/components'

import ToggleAccess, { ToggleAccessProps } from '../../ToggleAccess'
import Box from '../Box'
import styles from './styles.css'

export type SidebarManagementProps = ToggleAccessProps

const SidebarManagement: React.FC<SidebarManagementProps> = (props) => {
  return (
    <Box icon={<IconCircle24 size="md" />} title="articleManagement">
      <section className="container">
        <ToggleAccess {...props} />

        <style jsx>{styles}</style>
      </section>
    </Box>
  )
}

export default SidebarManagement
