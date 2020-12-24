import { ReactComponent as Icon } from '@/public/static/icons/dot.svg'

import { withIcon } from './withIcon'

export const IconDotDivider = withIcon((props) => (
  <Icon style={{ width: 18, height: 18 }} {...props} />
))
