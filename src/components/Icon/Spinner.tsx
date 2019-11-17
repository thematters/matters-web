import { Icon, IconSize } from '~/components/Icon'

import ICON_SPINNER from '~/static/icons/spinner.svg?sprite'

const IconSpinner = ({ size }: { size?: IconSize }) => (
  <Icon
    id={ICON_SPINNER.id}
    viewBox={ICON_SPINNER.viewBox}
    className="u-motion-spin"
    size={size || 'default'}
  />
)

export default IconSpinner
