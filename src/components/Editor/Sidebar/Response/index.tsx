import { FormattedMessage } from 'react-intl'

import IconComment from '@/public/static/icons/24px/comment.svg'
import { Icon } from '~/components'

import { SetResponseProps } from '../..'
import ToggleResponse, { ToggleResponseProps } from '../../ToggleResponse'
import Box from '../Box'
import styles from './styles.module.css'

export type SidebarManagementProps = ToggleResponseProps & SetResponseProps

const SidebarArticleResponse: React.FC<SidebarManagementProps> = (props) => {
  return (
    <Box
      icon={<Icon icon={IconComment} size={24} />}
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
