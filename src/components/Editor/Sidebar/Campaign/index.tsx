import { ReactComponent as IconRead } from '@/public/static/icons/24px/read.svg'
import { Icon } from '~/components'

import SelectCampaign, { SelectCampaignProps } from '../../SelectCampaign'
import Box from '../Box'
import styles from './styles.module.css'

const SidebarCampaign: React.FC<SelectCampaignProps> = (props) => {
  return (
    <Box
      icon={<Icon icon={IconRead} size={24} />}
      title="投稿七日書自由寫"
      borderColor="freeWriteBlue"
    >
      <section className={styles.container}>
        <SelectCampaign {...props} />
      </section>
    </Box>
  )
}

export default SidebarCampaign
