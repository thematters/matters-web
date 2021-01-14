import { IconSettings24 } from '~/components'

import ToggleCircle, { ToggleCircleProps } from '../../ToggleCircle'
import Box from '../Box'
import styles from './styles.css'

type ManagementProps = ToggleCircleProps

const Management: React.FC<ManagementProps> = (props) => {
  return (
    <Box icon={<IconSettings24 size="md" />} title="articleManagement">
      <section className="container">
        <ToggleCircle {...props} />

        <style jsx>{styles}</style>
      </section>
    </Box>
  )
}

export default Management
