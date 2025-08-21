import { FormattedMessage, useIntl } from 'react-intl'

import IconHelp from '@/public/static/icons/24px/help.svg'
import { Icon, Switch, Tooltip } from '~/components'

import Box from '../Box'
import styles from './styles.module.css'

export type SidebarISCNProps = {
  iscnPublish: boolean
  toggleISCN: (iscnPublish: boolean) => void
  iscnPublishSaving: boolean
}

const SidebarISCN: React.FC<SidebarISCNProps> = ({
  iscnPublish,
  toggleISCN,
  iscnPublishSaving,
}) => {
  const intl = useIntl()

  return (
    <Box
      title={
        <div className={styles.title}>
          <FormattedMessage defaultMessage="Register ISCN" id="D9/QIR" />
          <Tooltip
            content={
              <FormattedMessage
                defaultMessage="Metadata registered on the LikeCoin chain for each piece of content"
                id="zso4HL"
              />
            }
            zIndex={1000}
            placement="top"
            touch={['hold', 1000]}
          >
            <span className={styles.help}>
              <Icon icon={IconHelp} size={14} />
            </span>
          </Tooltip>
        </div>
      }
      subtitle={
        <FormattedMessage
          defaultMessage="Used for publishing Writing NFTs, cost ≈1 LIKE"
          id="h5Y9al"
        />
      }
      rightButton={
        <Switch
          name="iscn"
          label={intl.formatMessage({
            defaultMessage: 'Register ISCN',
            id: 'D9/QIR',
          })}
          checked={!!iscnPublish}
          onChange={() => toggleISCN(!iscnPublish)}
          loading={iscnPublishSaving}
        />
      }
    />
  )
}

export default SidebarISCN
