import { ReactComponent as IconArchitectBadge } from '@/public/static/icons/16px/badge-architect.svg'
import { ReactComponent as IconGoldenMotorBadge } from '@/public/static/icons/16px/badge-golden-motor.svg'
import { ReactComponent as IconSeedBadge } from '@/public/static/icons/16px/badge-seed.svg'
import { ReactComponent as IconTraveloggersBadge } from '@/public/static/icons/16px/traveloggers.svg'
import { ReactComponent as IconCivicLikerBadge } from '@/public/static/icons/20px/badge-civic-liker.svg'
import { Tooltip, Translate, withIcon } from '~/components'

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
        <>{withIcon(IconSeedBadge)({ size: 'md' })}</>
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
        <section>{withIcon(IconGoldenMotorBadge)({ size: 'md' })}</section>
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
        <section>{withIcon(IconArchitectBadge)({ size: 'md' })}</section>
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
        <section>{withIcon(IconCivicLikerBadge)({ size: 'md' })}</section>
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
        <section>{withIcon(IconTraveloggersBadge)({ size: 'md' })}</section>
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
