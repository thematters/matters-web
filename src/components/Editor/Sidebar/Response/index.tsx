import { IconComment16 } from '~/components'

import { SetPublishISCNProps } from '../..'
import { ToggleAccessProps } from '../../ToggleAccess'
import ToggleResponse from '../../ToggleResponse'
import Box from '../Box'
import styles from './styles.css'

export type SidebarManagementProps = ToggleAccessProps & SetPublishISCNProps

const SidebarArticleResponse: React.FC<SidebarManagementProps> = (props) => {
  return (
    <Box
      icon={<IconComment16 size="md" />}
      title="articleResponse"
      footerSpace={false}
    >
      <section className="container">
        <ToggleResponse inSidebar />
        <style jsx>{styles}</style>
      </section>
    </Box>
  )
}

export default SidebarArticleResponse
