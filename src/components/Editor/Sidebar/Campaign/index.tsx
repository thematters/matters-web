import { FormattedMessage } from 'react-intl'

import IconRead from '@/public/static/icons/24px/read.svg'
import { Icon } from '~/components'

import SelectCampaign, { SelectCampaignProps } from '../../SelectCampaign'
import Box from '../Box'
import styles from './styles.module.css'

const SidebarCampaign: React.FC<Partial<SelectCampaignProps>> = (props) => {
  if (!props.campaigns || props.campaigns.length === 0 || !props.editCampaign) {
    return null
  }

  return (
    <Box
      icon={<Icon icon={IconRead} size={24} />}
      title={<FormattedMessage defaultMessage="Add to event" id="XTRqqT" />}
      borderColor="campaignBlue"
    >
      <section className={styles.container}>
        <SelectCampaign {...(props as SelectCampaignProps)} />
      </section>
    </Box>
  )
}

export default SidebarCampaign
