import { Icon, IconColor, IconSize } from '~/components'

import ICON_LIKE from '~/static/icons/like.svg?sprite'

const IconLike: React.FC<{
  size?: IconSize
  color?: IconColor
  className?: string
  style?: { [key: string]: any }
}> = props => <Icon {...props} id={ICON_LIKE.id} viewBox={ICON_LIKE.viewBox} />

export default IconLike
