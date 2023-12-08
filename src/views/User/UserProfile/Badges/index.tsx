import classNames from 'classnames'
import { FormattedMessage } from 'react-intl'

import { ReactComponent as IconArchitectBadge } from '@/public/static/icons/48px/badge-architect.svg'
import { ReactComponent as IconCivicLikerBadge } from '@/public/static/icons/48px/badge-civic-liker.svg'
import { ReactComponent as IconGoldenMotorBadge } from '@/public/static/icons/48px/badge-golden-motor.svg'
import { ReactComponent as IconNomad1Badge } from '@/public/static/icons/48px/badge-nomad1-moon.svg'
import { ReactComponent as IconNomad2Badge } from '@/public/static/icons/48px/badge-nomad2-star.svg'
import { ReactComponent as IconNomad3Badge } from '@/public/static/icons/48px/badge-nomad3-light.svg'
import { ReactComponent as IconNomad4Badge } from '@/public/static/icons/48px/badge-nomad4-fire.svg'
import { ReactComponent as IconSeedBadge } from '@/public/static/icons/48px/badge-seed.svg'
import { ReactComponent as IconTraveloggersBadge } from '@/public/static/icons/48px/badge-traveloggers.svg'
import { Tooltip, Translate, withIcon } from '~/components'
import { IconArrowAction24 } from '~/components/Icon/IconArrowAction24'
import { UserStatus } from '~/gql/graphql'

import { BadgeNomadDialog } from '../BadgeNomadDialog'
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
        <>{withIcon(IconSeedBadge)({ size: 'xl' })}</>
        <section>{copy}</section>
      </section>
    )
  }

  if (hasTooltip) {
    return (
      <Tooltip content={copy} placement="top">
        <span className={styles.badge}>
          {withIcon(IconSeedBadge)({ size: 'mdS' })}
        </span>
      </Tooltip>
    )
  }

  return (
    <span className={styles.badge}>
      {withIcon(IconSeedBadge)({ size: 'mdS' })}
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
        <>{withIcon(IconGoldenMotorBadge)({ size: 'xl' })}</>
        <section>{copy}</section>
      </section>
    )
  }

  if (hasTooltip) {
    return (
      <Tooltip content={copy} placement="top">
        <span className={styles.badge}>
          {withIcon(IconGoldenMotorBadge)({ size: 'mdS' })}
        </span>
      </Tooltip>
    )
  }

  return (
    <span className={styles.badge}>
      {withIcon(IconGoldenMotorBadge)({ size: 'mdS' })}
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
        <>{withIcon(IconArchitectBadge)({ size: 'xl' })}</>
        <section>{copy}</section>
      </section>
    )
  }

  if (hasTooltip) {
    return (
      <Tooltip content={copy} placement="top">
        <span className={styles.badge}>
          {withIcon(IconArchitectBadge)({ size: 'mdS' })}
        </span>
      </Tooltip>
    )
  }

  return (
    <span className={styles.badge}>
      {withIcon(IconArchitectBadge)({ size: 'mdS' })}
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
        <>{withIcon(IconCivicLikerBadge)({ size: 'xl' })}</>
        <section>{copy}</section>
      </section>
    )
  }

  if (hasTooltip) {
    return (
      <Tooltip content={copy} placement="top">
        <span className={styles.badge}>
          {withIcon(IconCivicLikerBadge)({ size: 'mdS' })}
        </span>
      </Tooltip>
    )
  }

  return (
    <span className={styles.badge}>
      {withIcon(IconCivicLikerBadge)({ size: 'mdS' })}
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
        <>{withIcon(IconTraveloggersBadge)({ size: 'xl' })}</>
        <section>{copy}</section>
      </section>
    )
  }
  if (hasTooltip) {
    return (
      <Tooltip content={copy} placement="top">
        <span className={styles.badge}>
          {withIcon(IconTraveloggersBadge)({ size: 'mdS' })}
        </span>
      </Tooltip>
    )
  }

  return (
    <span className={styles.badge}>
      {withIcon(IconTraveloggersBadge)({ size: 'mdS' })}
    </span>
  )
}

export const NomadBadge = ({
  isInDialog,
  hasTooltip,
  level,
  totalReferredCount,
  shareLink,
}: badgePros & {
  level: 1 | 2 | 3 | 4
  totalReferredCount?: UserStatus['totalReferredCount']
  shareLink?: string
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
      <BadgeNomadDialog
        isNested
        nomadBadgeLevel={level}
        totalReferredCount={totalReferredCount}
        shareLink={shareLink}
      >
        {({ openDialog }) => (
          <section
            className={classNames([styles.item, styles.itemNomad])}
            onClick={openDialog}
          >
            <>{withIconComp({ size: 'xl' })}</>
            <section className={styles.info}>
              <section>
                {level === 4 ? (
                  <FormattedMessage defaultMessage="LV4 Firebolt" id="FuU2MU" />
                ) : level === 3 ? (
                  <FormattedMessage
                    defaultMessage="LV3 Nimbus Ferry"
                    id="sLiIAz"
                  />
                ) : level === 2 ? (
                  <FormattedMessage
                    defaultMessage="LV2 Meteor Canoe"
                    id="7ZXP9S"
                  />
                ) : (
                  <FormattedMessage
                    defaultMessage="LV1 Moonlight Dream"
                    id="+56XIp"
                  />
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
            <IconArrowAction24 size="md" color="greyDarker" />
          </section>
        )}
      </BadgeNomadDialog>
    )
  }
  if (hasTooltip) {
    return (
      <Tooltip content={copy} placement="top">
        <span className={styles.badge}>{withIconComp({ size: 'mdS' })}</span>
      </Tooltip>
    )
  }

  return <span className={styles.badge}>{withIconComp({ size: 'mdS' })}</span>
}

export interface BadgesOptions {
  hasNomadBadge?: boolean
  nomadBadgeLevel?: 1 | 2 | 3 | 4
  totalReferredCount?: UserStatus['totalReferredCount']
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
  totalReferredCount,
  hasTraveloggersBadge,
  hasSeedBadge,
  hasGoldenMotorBadge,
  hasArchitectBadge,
  isCivicLiker,
  shareLink,
}: BadgesOptions & {
  isInDialog?: boolean
  shareLink?: string
}) =>
  isInDialog ? (
    <span className={styles.badgesInDialog}>
      {hasNomadBadge && (
        <section className={styles.badgesGroup}>
          <NomadBadge
            isInDialog
            level={nomadBadgeLevel!}
            totalReferredCount={totalReferredCount}
            shareLink={shareLink}
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
