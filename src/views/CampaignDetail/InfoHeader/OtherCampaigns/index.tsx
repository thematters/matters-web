import { FormattedMessage } from 'react-intl'

import IconRight from '@/public/static/icons/24px/right.svg'
import { PATHS } from '~/common/enums'
import { Button, Icon, TextIcon } from '~/components'

import styles from './styles.module.css'

const OtherCampaigns = () => {
  return (
    <Button
      className={styles.campaigns}
      textColor="grey"
      textActiveColor="black"
      href={PATHS.CAMPAIGNS}
    >
      <TextIcon
        icon={<Icon icon={IconRight} size={14} />}
        placement="left"
        weight="medium"
        size={14}
      >
        <FormattedMessage defaultMessage="More events" id="zM1YNT" />
      </TextIcon>
    </Button>
  )
}

export default OtherCampaigns
