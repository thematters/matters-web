import { ReactComponent as Icon } from '@/public/static/icons/logo.svg'

import { withIcon } from './withIcon'

export const IconLogo = withIcon((props) => (
  <Icon style={{ width: 120, height: 24.75 }} {...props} />
))
