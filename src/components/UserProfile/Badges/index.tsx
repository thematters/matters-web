import { Button, Tooltip, Translate, withIcon } from '~/components'

import { EXTERNAL_LINKS } from '~/common/enums'
import { ReactComponent as IconCivicLikerBadge } from '~/static/icons/civic-liker-badge.svg'
import { ReactComponent as IconSeedBadge } from '~/static/icons/early-user-badge.svg'

import styles from './styles.css'

export const SeedBadge = () => (
  <Tooltip content={<Translate zh_hant="種子用戶" zh_hans="种子用户" />}>
    <span className="seed-badge">
      {withIcon(IconSeedBadge)({})}
      <style jsx>{styles}</style>
    </span>
  </Tooltip>
)

export const CivicLikerBadge = () => (
  <Button href={EXTERNAL_LINKS.CIVIC_LIKER_SUPPORT} target="_blank">
    {withIcon((props) => (
      <IconCivicLikerBadge style={{ width: 67, height: 16 }} {...props} />
    ))({})}
  </Button>
)
