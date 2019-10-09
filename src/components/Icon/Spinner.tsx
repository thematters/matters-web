import { Icon } from '~/components/Icon'

import ICON_SPINNER from '~/static/icons/spinner.svg?sprite'

const IconSpinner = () => (
  <Icon
    id={ICON_SPINNER.id}
    viewBox={ICON_SPINNER.viewBox}
    className="u-motion-spin"
  />
)

export default IconSpinner
