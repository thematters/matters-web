import { ReactComponent as Spinner } from './icons/spinner.svg'
import { withIcon } from './withIcon'

export const IconSpinner = withIcon(({ className, ...restProps }) => (
  <Spinner className={`u-motion-spin ${className}`} {...restProps} />
))
