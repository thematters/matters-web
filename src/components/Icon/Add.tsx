import { Icon, IconColor, IconSize } from '~/components/Icon'

import ICON_ADD from '~/static/icons/add.svg?sprite'

const AddIcon = ({ color, size }: { color?: IconColor; size?: IconSize }) => (
  <Icon id={ICON_ADD.id} viewBox={ICON_ADD.viewBox} color={color} size={size} />
)

export default AddIcon
