import { ReactComponent as DotDivider } from './icons/dot-divider.svg'
import { withIcon } from './withIcon'

export const IconDotDivider = withIcon((props) => (
  <DotDivider style={{ width: 18, height: 18 }} {...props} />
))
