import { FormattedMessage } from 'react-intl'

import SelectCampaign, { SelectCampaignProps } from '../../SelectCampaign'
import Box from '../Box'
import styles from './styles.module.css'

const SidebarCampaign: React.FC<Partial<SelectCampaignProps>> = (props) => {
  if (!props.campaigns || props.campaigns.length === 0 || !props.editCampaign) {
    return null
  }

  return (
    <Box
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
