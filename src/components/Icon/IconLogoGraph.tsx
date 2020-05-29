import { ReactComponent as LogoGraph } from './icons/logo-graph.svg'
import { withIcon } from './withIcon'

export const IconLogoGraph = withIcon((props) => (
  <LogoGraph style={{ width: 48, height: 33 }} {...props} />
))
