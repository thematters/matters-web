import Link from 'next/link'
import { FormattedMessage, useIntl } from 'react-intl'

import IconHelp from '@/public/static/icons/24px/help.svg'
import { Icon, Switch } from '~/components'

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
          <Link
            className={styles.help}
            href="https://docs.like.co/v/zh/general-guides/writing-nft/nft-portal#publish-writing-nft-with-iscn-id"
            target="_blank"
          >
            <Icon icon={IconHelp} size={14} />
          </Link>
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
