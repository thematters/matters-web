import { Icon } from '~/components'

import ICON_BRANCHES from '~/static/icons/branches.svg?sprite'

const StreamsButton = () => (
  <button
    type="button"
    aria-label="查看上下游"
    onClick={() => alert('TODO: popup downstreams/upsteams popper')}
  >
    <Icon
      size="default"
      className="u-motion-icon-hover"
      id={ICON_BRANCHES.id}
      viewBox={ICON_BRANCHES.viewBox}
    />
  </button>
)

export default StreamsButton
