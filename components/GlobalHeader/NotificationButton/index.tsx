import { Icon } from '~/components'

import ICON_NOTIFICATION from '~/static/icons/notification.svg?sprite'

export default () => (
  <button type="button" className="u-motion-icon-hover" aria-label="通知">
    <Icon id={ICON_NOTIFICATION.id} viewBox={ICON_NOTIFICATION.viewBox} />
  </button>
)
