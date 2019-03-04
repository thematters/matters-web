import { Icon } from '~/components'

import ICON_MORE_REGULAR from '~/static/icons/more-regular.svg?sprite'

const MoreButton = () => (
  <button
    type="button"
    aria-label="更多操作"
    onClick={() => alert('TODO: popup more popover')}
  >
    <Icon
      size="default"
      id={ICON_MORE_REGULAR.id}
      viewBox={ICON_MORE_REGULAR.viewBox}
    />
  </button>
)

export default MoreButton
