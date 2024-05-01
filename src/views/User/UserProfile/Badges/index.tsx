import classNames from 'classnames'
import { FormattedMessage } from 'react-intl'

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
import { Icon, Tooltip, Translate, withIcon } from '~/components'

// import { BadgeNomadDialog } from '../BadgeNomadLabel'
import styles from './styles.module.css'

type badgePros = {
  isInDialog?: boolean
  hasTooltip?: boolean
}

export const SeedBadge = ({ isInDialog, hasTooltip }: badgePros) => {
  const copy = (
    <Translate zh_hant="種子用戶" zh_hans="种子用户" en="Seed User" />
  )
  if (isInDialog) {
    return (
      <section className={styles.item}>
        <>{withIcon(IconSeedBadge)({ size: 48 })}</>
        <section>{copy}</section>
      </section>
    )
  }

  if (hasTooltip) {
    return (
      <Tooltip content={copy} placement="top">
        <span className={styles.badge}>
          {withIcon(IconSeedBadge)({ size: 20 })}
        </span>
      </Tooltip>
    )
  }

  return (
    <span className={styles.badge}>
      {withIcon(IconSeedBadge)({ size: 20 })}
    </span>
  )
}

export const GoldenMotorBadge = ({ isInDialog, hasTooltip }: badgePros) => {
  const copy = (
    <Translate
      zh_hant="支持超過 100 次"
      zh_hans="支持超过 100 次"
      en="More than 100 supports"
    />
  )
  if (isInDialog) {
    return (
      <section className={styles.item}>
        <>{withIcon(IconGoldenMotorBadge)({ size: 48 })}</>
        <section>{copy}</section>
      </section>
    )
  }

  if (hasTooltip) {
    return (
      <Tooltip content={copy} placement="top">
        <span className={styles.badge}>
          {withIcon(IconGoldenMotorBadge)({ size: 20 })}
        </span>
      </Tooltip>
    )
  }

  return (
    <span className={styles.badge}>
      {withIcon(IconGoldenMotorBadge)({ size: 20 })}
    </span>
  )
}

export const ArchitectBadge = ({ isInDialog, hasTooltip }: badgePros) => {
  const copy = (
    <Translate
      zh_hant="馬特市建築師"
      zh_hans="马特市建筑师"
      en="Matters Architect"
    />
  )
  if (isInDialog) {
    return (
      <section className={styles.item}>
        <>{withIcon(IconArchitectBadge)({ size: 48 })}</>
        <section>{copy}</section>
      </section>
    )
  }

  if (hasTooltip) {
    return (
      <Tooltip content={copy} placement="top">
        <span className={styles.badge}>
          {withIcon(IconArchitectBadge)({ size: 20 })}
        </span>
      </Tooltip>
    )
  }

  return (
    <span className={styles.badge}>
      {withIcon(IconArchitectBadge)({ size: 20 })}
    </span>
  )
}

export const CivicLikerBadge = ({ isInDialog, hasTooltip }: badgePros) => {
  const copy = (
    <Translate zh_hant="讚賞公民" zh_hans="赞赏公民" en="CIVIC LIKER" />
  )
  if (isInDialog) {
    return (
      <section className={styles.item}>
        <>{withIcon(IconCivicLikerBadge)({ size: 48 })}</>
        <section>{copy}</section>
      </section>
    )
  }

  if (hasTooltip) {
    return (
      <Tooltip content={copy} placement="top">
        <span className={styles.badge}>
          {withIcon(IconCivicLikerBadge)({ size: 20 })}
        </span>
      </Tooltip>
    )
  }

  return (
    <span className={styles.badge}>
      {withIcon(IconCivicLikerBadge)({ size: 20 })}
    </span>
  )
}

export const TraveloggersBadge = ({ isInDialog, hasTooltip }: badgePros) => {
  const copy = (
    <Translate
      zh_hant="Traveloggers"
      zh_hans="Traveloggers"
      en="Traveloggers"
    />
  )
  if (isInDialog) {
    return (
      <section className={styles.item}>
        <>{withIcon(IconTraveloggersBadge)({ size: 48 })}</>
        <section>{copy}</section>
      </section>
    )
  }
  if (hasTooltip) {
    return (
      <Tooltip content={copy} placement="top">
        <span className={styles.badge}>
          {withIcon(IconTraveloggersBadge)({ size: 20 })}
        </span>
      </Tooltip>
    )
  }

  return (
    <span className={styles.badge}>
      {withIcon(IconTraveloggersBadge)({ size: 20 })}
    </span>
  )
}

export const NomadBadge = ({
  isInDialog,
  hasTooltip,
  level,
  gotoNomadBadge,
}: badgePros & {
  level: 1 | 2 | 3 | 4
  gotoNomadBadge?: () => void
}) => {
  const copy = (
    <Translate zh_hant="數字游民" zh_hans="数字游民" en="Nomad Matters" />
  )

  let withIconComp = withIcon(IconNomad1Badge)
  switch (level) {
    case 2:
      withIconComp = withIcon(IconNomad2Badge)
      break
    case 3:
      withIconComp = withIcon(IconNomad3Badge)
      break
    case 4:
      withIconComp = withIcon(IconNomad4Badge)
      break
  }

  if (isInDialog) {
    return (
      <section
        className={classNames([styles.item, styles.itemNomad])}
        onClick={gotoNomadBadge}
      >
        <>{withIconComp({ size: 48 })}</>
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
      <Tooltip content={copy} placement="top">
        <span className={[styles.badge, styles.nomad].join(' ')}>
          {withIconComp({ size: 20 })}
        </span>
      </Tooltip>
    )
  }

  return (
    <span className={[styles.badge, styles.nomad].join(' ')}>
      {withIconComp({ size: 20 })}
    </span>
  )
}

export interface BadgesOptions {
  hasNomadBadge?: boolean
  nomadBadgeLevel?: 1 | 2 | 3 | 4
  hasTraveloggersBadge?: boolean
  hasSeedBadge?: boolean
  hasGoldenMotorBadge?: boolean
  hasArchitectBadge?: boolean
  isCivicLiker?: boolean
  gotoNomadBadge?: () => void

  isInDialog?: boolean
  shareLink: string
}

export const Badges = ({
  isInDialog,
  hasNomadBadge,
  nomadBadgeLevel,
  hasTraveloggersBadge,
  hasSeedBadge,
  hasGoldenMotorBadge,
  hasArchitectBadge,
  isCivicLiker,
  gotoNomadBadge,
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
      {hasTraveloggersBadge && <TraveloggersBadge />}
      {hasSeedBadge && <SeedBadge />}
      {hasGoldenMotorBadge && <GoldenMotorBadge />}
      {hasArchitectBadge && <ArchitectBadge />}
      {isCivicLiker && <CivicLikerBadge />}
    </span>
  )
