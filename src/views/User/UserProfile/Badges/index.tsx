import classNames from 'classnames'
import { FormattedMessage } from 'react-intl'

import { ReactComponent as IconGrandSlam } from '@/public/static/icons/24px/badge-grand-slam.svg'
import { ReactComponent as IconNomad1Badge } from '@/public/static/icons/24px/badge-nomad1-moon.svg'
import { ReactComponent as IconNomad2Badge } from '@/public/static/icons/24px/badge-nomad2-star.svg'
import { ReactComponent as IconNomad3Badge } from '@/public/static/icons/24px/badge-nomad3-light.svg'
import { ReactComponent as IconNomad4Badge } from '@/public/static/icons/24px/badge-nomad4-fire.svg'
import { ReactComponent as IconCivicLikerBadge } from '@/public/static/icons/24px/civic-liker.svg'
import { ReactComponent as IconGoldenMotorBadge } from '@/public/static/icons/24px/golden-motor-award.svg'
import { ReactComponent as IconArchitectBadge } from '@/public/static/icons/24px/matters-architect.svg'
import { ReactComponent as IconRight } from '@/public/static/icons/24px/right.svg'
import { ReactComponent as IconSeedBadge } from '@/public/static/icons/24px/seed-user.svg'
import { ReactComponent as IconTraveloggersBadge } from '@/public/static/icons/24px/traveloggers.svg'
import { Icon, Tooltip, WrappedIcon } from '~/components'

// import { BadgeNomadDialog } from '../BadgeNomadLabel'
import styles from './styles.module.css'

type BadgePros = {
  isInDialog?: boolean
  hasTooltip?: boolean
  onClick?: () => void
}

const withBadge = ({
  icon,
  name,
}: {
  icon: WrappedIcon
  name: string | React.ReactNode
}) => {
  const Badge = ({ isInDialog, hasTooltip }: BadgePros) => {
    if (isInDialog) {
      return (
        <section className={styles.item}>
          <Icon icon={icon} size={48} />
          <section>{name}</section>
        </section>
      )
    }

    if (hasTooltip) {
      return (
        <Tooltip content={name} placement="top">
          <span className={styles.badge}>
            <Icon icon={icon} size={20} />
          </span>
        </Tooltip>
      )
    }

    return (
      <span className={styles.badge}>
        <Icon icon={icon} size={20} />
      </span>
    )
  }

  return Badge
}

export const SeedBadge = withBadge({
  icon: IconSeedBadge,
  name: <FormattedMessage defaultMessage="Seed User" id="QbjADp" />,
})

export const GoldenMotorBadge = withBadge({
  icon: IconGoldenMotorBadge,
  name: (
    <FormattedMessage defaultMessage="More than 100 supports" id="orIq4X" />
  ),
})

export const ArchitectBadge = withBadge({
  icon: IconArchitectBadge,
  name: <FormattedMessage defaultMessage="Matters Architect" id="D9tEst" />,
})

export const CivicLikerBadge = withBadge({
  icon: IconCivicLikerBadge,
  name: <FormattedMessage defaultMessage="CIVIC LIKER" id="lfiBVR" />,
})

export const TraveloggersBadge = withBadge({
  icon: IconTraveloggersBadge,
  name: 'Traveloggers',
})

export const NomadBadge = ({
  isInDialog,
  hasTooltip,
  onClick,
  level,
  gotoNomadBadge,
}: BadgePros & {
  level: 1 | 2 | 3 | 4
  gotoNomadBadge?: () => void
}) => {
  let icon = IconNomad1Badge
  switch (level) {
    case 2:
      icon = IconNomad2Badge
      break
    case 3:
      icon = IconNomad3Badge
      break
    case 4:
      icon = IconNomad4Badge
      break
  }

  if (isInDialog) {
    return (
      <section
        className={classNames([styles.item, styles.itemNomad])}
        onClick={gotoNomadBadge}
        role="button"
      >
        <Icon icon={icon} size={48} />
        <section className={styles.info}>
          <section>
            {level === 4 ? (
              <FormattedMessage defaultMessage="Firebolt" id="Rc4Oij" />
            ) : level === 3 ? (
              <FormattedMessage defaultMessage="Nimbus Ferry" id="8MeJ4b" />
            ) : level === 2 ? (
              <FormattedMessage defaultMessage="Meteor Canoe" id="TKsfIS" />
            ) : (
              <FormattedMessage defaultMessage="Moonlight Dream" id="76yoL6" />
            )}
          </section>
          <section className={styles.subtitle}>
            <FormattedMessage
              defaultMessage="Nomad Matters Badge"
              id="cQ+Lyq"
              description="src/views/User/UserProfile/Badges/index.tsx"
            />
          </section>
        </section>
        <Icon icon={IconRight} size={24} color="greyDarker" />
      </section>
    )
  }

  if (hasTooltip) {
    return (
      <Tooltip
        content={
          level === 4 ? (
            <FormattedMessage defaultMessage="Firebolt" id="Rc4Oij" />
          ) : level === 3 ? (
            <FormattedMessage defaultMessage="Nimbus Ferry" id="8MeJ4b" />
          ) : level === 2 ? (
            <FormattedMessage defaultMessage="Meteor Canoe" id="TKsfIS" />
          ) : (
            <FormattedMessage defaultMessage="Moonlight Dream" id="76yoL6" />
          )
        }
        placement="top"
      >
        <button
          onClick={onClick}
          className={[styles.badge, styles.nomad].join(' ')}
        >
          <Icon icon={icon} size={20} />
        </button>
      </Tooltip>
    )
  }

  return (
    <span className={[styles.badge, styles.nomad].join(' ')}>
      <Icon icon={icon} size={20} />
    </span>
  )
}

export const GrandSlamBadge = ({
  isInDialog,
  hasTooltip,
  onClick,
  gotoGrandSlamBadge,
}: BadgePros & { gotoGrandSlamBadge?: () => void }) => {
  if (isInDialog) {
    return (
      <section
        className={classNames([styles.item, styles.itemNomad])}
        onClick={gotoGrandSlamBadge}
        role="button"
      >
        <Icon icon={IconGrandSlam} size={48} />
        <section className={styles.info}>
          <section>
            <FormattedMessage
              defaultMessage="Seven Days Grand Slam"
              id="iNXSkV"
            />
          </section>
          <section className={styles.subtitle}>
            <FormattedMessage defaultMessage="Free-writing Badge" id="DqTwwn" />
          </section>
        </section>
        <Icon icon={IconRight} size={24} color="greyDarker" />
      </section>
    )
  }

  if (hasTooltip) {
    return (
      <Tooltip
        content={
          <FormattedMessage
            defaultMessage="Seven Days Grand Slam"
            id="iNXSkV"
          />
        }
        placement="top"
      >
        <button
          onClick={onClick}
          className={[styles.badge, styles.nomad].join(' ')}
        >
          <Icon icon={IconGrandSlam} size={20} />
        </button>
      </Tooltip>
    )
  }

  return (
    <span className={[styles.badge, styles.nomad].join(' ')}>
      <Icon icon={IconGrandSlam} size={20} />
    </span>
  )
}

export interface BadgesOptions {
  isInDialog?: boolean

  hasNomadBadge?: boolean
  nomadBadgeLevel?: 1 | 2 | 3 | 4
  gotoNomadBadge?: () => void

  hasGrandSlamBadge?: boolean
  gotoGrandSlamBadge?: () => void

  hasTraveloggersBadge?: boolean
  hasSeedBadge?: boolean
  hasGoldenMotorBadge?: boolean
  hasArchitectBadge?: boolean
  isCivicLiker?: boolean
}

export const Badges = ({
  isInDialog,
  hasNomadBadge,
  nomadBadgeLevel,
  gotoNomadBadge,
  hasGrandSlamBadge,
  gotoGrandSlamBadge,
  hasTraveloggersBadge,
  hasSeedBadge,
  hasGoldenMotorBadge,
  hasArchitectBadge,
  isCivicLiker,
}: BadgesOptions) =>
  isInDialog ? (
    <span className={styles.badgesInDialog}>
      {hasNomadBadge && gotoNomadBadge && (
        <section className={styles.badgesGroup}>
          <NomadBadge
            isInDialog
            level={nomadBadgeLevel!}
            gotoNomadBadge={gotoNomadBadge}
          />
        </section>
      )}
      {hasGrandSlamBadge && (
        <section className={styles.badgesGroup}>
          <GrandSlamBadge isInDialog gotoGrandSlamBadge={gotoGrandSlamBadge} />
        </section>
      )}
      {(hasTraveloggersBadge ||
        hasSeedBadge ||
        hasGoldenMotorBadge ||
        hasArchitectBadge ||
        isCivicLiker) && (
        <section className={styles.badgesGroup}>
          {hasTraveloggersBadge && <TraveloggersBadge isInDialog />}
          {hasSeedBadge && <SeedBadge isInDialog />}
          {hasGoldenMotorBadge && <GoldenMotorBadge isInDialog />}
          {hasArchitectBadge && <ArchitectBadge isInDialog />}
          {isCivicLiker && <CivicLikerBadge isInDialog />}
        </section>
      )}
    </span>
  ) : (
    <span className={styles.badgesInPage}>
      {hasNomadBadge && <NomadBadge level={nomadBadgeLevel!} />}
      {hasGrandSlamBadge && <GrandSlamBadge />}
      {hasTraveloggersBadge && <TraveloggersBadge />}
      {hasSeedBadge && <SeedBadge />}
      {hasGoldenMotorBadge && <GoldenMotorBadge />}
      {hasArchitectBadge && <ArchitectBadge />}
      {isCivicLiker && <CivicLikerBadge />}
    </span>
  )
