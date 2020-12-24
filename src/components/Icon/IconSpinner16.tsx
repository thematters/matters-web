import { ReactComponent as Icon } from '@/public/static/icons/16px/spinner.svg'

import { withIcon } from './withIcon'

export const IconSpinner16 = withIcon(({ className, ...restProps }) => (
  <Icon className={`u-motion-spin ${className}`} {...restProps} />
))
