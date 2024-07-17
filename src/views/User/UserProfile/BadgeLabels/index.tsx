import { FormattedMessage } from 'react-intl'

import { Tooltip } from '~/components'

import { GrandSlamBadge, NomadBadge } from '../Badges'

type BaseBadgeLabelProps = {
  hasTooltip?: boolean
  onClick?: () => void
}

type BadgeNomadLabelProps = BaseBadgeLabelProps & {
  nomadBadgeLevel: 1 | 2 | 3 | 4
}

export const BadgeNomadLabel: React.FC<BadgeNomadLabelProps> = ({
  hasTooltip,
  nomadBadgeLevel,
  onClick,
}) => {
  const Content = (
    <button onClick={onClick}>
      <NomadBadge level={nomadBadgeLevel!} />
    </button>
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

export const BadgeGrandSlamLabel: React.FC<BaseBadgeLabelProps> = ({
  hasTooltip,
  onClick,
}) => {
  const Content = (
    <button onClick={onClick}>
      <GrandSlamBadge />
    </button>
  )

  return (
    <>
      {hasTooltip && (
        <Tooltip
          content={
            <FormattedMessage
              defaultMessage="Seven Days Grand Slam"
              id="iNXSkV"
            />
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
