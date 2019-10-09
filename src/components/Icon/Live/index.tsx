import { Icon } from '~/components/Icon'
import { Translate } from '~/components/Language'
import { Tooltip } from '~/components/Popper'

import ICON_LIVE from '~/static/icons/label-live.svg?sprite'

import styles from './styles.css'

const IconLive = () => (
  <Tooltip
    content={<Translate zh_hant="線上對談進行中" zh_hans="线上对谈进行中" />}
  >
    <span aria-label="LIVE">
      <Icon
        id={ICON_LIVE.id}
        viewBox={ICON_LIVE.viewBox}
        size="xlarge"
        style={{ height: 20 }}
      />
      <style jsx>{styles}</style>
    </span>
  </Tooltip>
)

export default IconLive
