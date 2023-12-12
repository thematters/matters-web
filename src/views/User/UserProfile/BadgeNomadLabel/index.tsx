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
              <FormattedMessage defaultMessage="Firebolt" id="Rc4Oij" />
            ) : nomadBadgeLevel === 3 ? (
              <FormattedMessage defaultMessage="Nimbus Ferry" id="8MeJ4b" />
            ) : nomadBadgeLevel === 2 ? (
              <FormattedMessage defaultMessage="Meteor Canoe" id="TKsfIS" />
            ) : (
              <FormattedMessage defaultMessage="Moonlight Dream" id="76yoL6" />
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
