import { FormattedMessage } from 'react-intl'

import { Tooltip } from '~/components'

import { NomadBadge } from '../Badges'
import styles from './styles.module.css'

type BadgeNomadLabelProps = {
  hasTooltip?: boolean
  nomadBadgeLevel: 1 | 2 | 3 | 4
  onClick?: () => void
}

export const BadgeNomadLabel: React.FC<BadgeNomadLabelProps> = ({
  hasTooltip,
  nomadBadgeLevel,
  onClick,
}) => {
  const Content = (
    <span className={styles.badge} onClick={onClick}>
      <NomadBadge level={nomadBadgeLevel!} />
    </span>
  )

  return (
    <>
      {hasTooltip && (
        <Tooltip
          content={
            nomadBadgeLevel === 4 ? (
              <FormattedMessage defaultMessage="LV4 Firebolt" id="FuU2MU" />
            ) : nomadBadgeLevel === 3 ? (
              <FormattedMessage defaultMessage="LV3 Nimbus Ferry" id="sLiIAz" />
            ) : nomadBadgeLevel === 2 ? (
              <FormattedMessage defaultMessage="LV2 Meteor Canoe" id="7ZXP9S" />
            ) : (
              <FormattedMessage
                defaultMessage="LV1 Moonlight Dream"
                id="+56XIp"
              />
            )
          }
          placement="top"
        >
          {Content}
        </Tooltip>
      )}

      {!hasTooltip && Content}
    </>
  )
}

