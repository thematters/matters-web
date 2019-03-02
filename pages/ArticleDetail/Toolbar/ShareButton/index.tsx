import { Icon } from '~/components'

import ICON_SHARE from '~/static/icons/share.svg?sprite'

const ShareButton = () => (
  <button
    type="button"
    aria-label="分享"
    onClick={() => alert('TODO: popup share modal')}
  >
    <Icon size="default" id={ICON_SHARE.id} viewBox={ICON_SHARE.viewBox} />
  </button>
)

export default ShareButton
