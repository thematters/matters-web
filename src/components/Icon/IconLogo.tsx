import { ReactComponent as Logo } from './icons/logo.svg'
import { withIcon } from './withIcon'

export const IconLogo = withIcon((props) => (
  <Logo style={{ width: 97, height: 20 }} {...props} />
))
