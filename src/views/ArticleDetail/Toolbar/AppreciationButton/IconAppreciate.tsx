import { Icon } from '~/components'

import ICON_LIKE from '~/static/icons/like.svg?sprite'

const IconAppreciate = () => (
  <Icon
    id={ICON_LIKE.id}
    viewBox={ICON_LIKE.viewBox}
    style={{ width: 22, height: 22 }}
  />
)

export default IconAppreciate
