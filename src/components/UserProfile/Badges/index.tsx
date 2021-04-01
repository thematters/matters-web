import { Button, Tooltip, Translate, withIcon } from '~/components'

import { EXTERNAL_LINKS } from '~/common/enums'

import { ReactComponent as IconArchitectBadge } from '@/public/static/icons/16px/badge-architect.svg'
import { ReactComponent as IconGoldenMotorBadge } from '@/public/static/icons/16px/badge-golden-motor.svg'
import { ReactComponent as IconSeedBadge } from '@/public/static/icons/16px/badge-seed.svg'
import { ReactComponent as IconCivicLikerBadge } from '@/public/static/icons/badge-civic-liker.svg'

import styles from './styles.css'

export const SeedBadge = () => (
  <Tooltip
    content={<Translate zh_hant="種子用戶" zh_hans="种子用户" en="Seed user" />}
  >
    <span className="badge">
      {withIcon(IconSeedBadge)({})}
      <style jsx>{styles}</style>
    </span>
  </Tooltip>
)

export const GoldenMotorBadge = () => (
  <Tooltip
    content={
      <Translate
        zh_hant="支持超過 100 次"
        zh_hans="支持超过 100 次"
        en="Support more than 100 times"
      />
    }
  >
    <span className="badge">
      {withIcon(IconGoldenMotorBadge)({})}
      <style jsx>{styles}</style>
    </span>
  </Tooltip>
)

export const ArchitectBadge = () => (
  <Tooltip
    content={
      <Translate
        zh_hant="馬特市建築師"
        zh_hans="马特市建筑师"
        en="Matters Architect"
      />
    }
  >
    <span className="badge">
      {withIcon(IconArchitectBadge)({})}
      <style jsx>{styles}</style>
    </span>
  </Tooltip>
)

export const CivicLikerBadge = () => (
  <Button htmlHref={EXTERNAL_LINKS.CIVIC_LIKER_SUPPORT} htmlTarget="_blank">
    {withIcon((props) => (
      <IconCivicLikerBadge style={{ width: 67, height: 16 }} {...props} />
    ))({})}
  </Button>
)
