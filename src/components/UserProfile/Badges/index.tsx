import { Button, Icon, Tooltip, Translate } from '~/components'

import { EXTERNAL_LINKS } from '~/common/enums'

import styles from './styles.css'

export const SeedBadge = () => (
  <Tooltip content={<Translate zh_hant="種子用戶" zh_hans="种子用户" />}>
    <span>
      <Icon.SeedBadge />
    </span>
  </Tooltip>
)

export const CivicLikerBadge = () => (
  <Button
    href={EXTERNAL_LINKS.CIVIC_LIKER_SUPPORT}
    target="_blank"
    bgColor="green"
  >
    <span className="badge-civic-liker">Civic Liker</span>

    <style jsx>{styles}</style>
  </Button>
)
