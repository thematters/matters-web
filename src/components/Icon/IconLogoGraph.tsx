import { ReactComponent as Icon } from '@/public/static/icons/logo-graph.svg'

import { withIcon } from './withIcon'

export const IconLogoGraph = withIcon((props) => (
  <Icon style={{ width: 48, height: 33 }} {...props} />
))
