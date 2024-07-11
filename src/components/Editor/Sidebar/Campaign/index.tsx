import { FormattedMessage } from 'react-intl'

import { ReactComponent as IconRead } from '@/public/static/icons/24px/read.svg'
import { Icon } from '~/components'

import SelectCampaign, { SelectCampaignProps } from '../../SelectCampaign'
import Box from '../Box'
import styles from './styles.module.css'

const SidebarCampaign: React.FC<Partial<SelectCampaignProps>> = (props) => {
  if (!props.campaign || !props.editCampaign) {
    return null
  }

  return (
    <Box
      icon={<Icon icon={IconRead} size={24} />}
      title={<FormattedMessage defaultMessage="Add to FreeWrite" id="6pc948" />}
      borderColor="freeWriteBlue"
    >
      <section className={styles.container}>
        <SelectCampaign {...(props as SelectCampaignProps)} />
      </section>
    </Box>
  )
}

export default SidebarCampaign
