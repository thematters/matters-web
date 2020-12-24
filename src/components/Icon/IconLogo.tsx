import { ReactComponent as Icon } from '@/public/static/icons/logo.svg'

import { withIcon } from './withIcon'

export const IconLogo = withIcon((props) => (
  <Icon style={{ width: 97, height: 20 }} {...props} />
))
