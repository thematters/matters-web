import { FormattedMessage } from 'react-intl'

import { IconComment16 } from '~/components'

import { SetResponseProps } from '../..'
import ToggleResponse, { ToggleResponseProps } from '../../ToggleResponse'
import Box from '../Box'
import styles from './styles.module.css'

export type SidebarManagementProps = ToggleResponseProps & SetResponseProps

const SidebarArticleResponse: React.FC<SidebarManagementProps> = (props) => {
  return (
    <Box
      icon={<IconComment16 size="md" />}
      title={
        <FormattedMessage
          defaultMessage="Response"
          id="20yT4t"
          description="src/components/Editor/Sidebar/Response/index.tsx"
        />
      }
      footerSpacing={false}
    >
      <section className={styles.container}>
        <ToggleResponse inSidebar {...props} />
      </section>
    </Box>
  )
}

export default SidebarArticleResponse
