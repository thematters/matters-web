import { ReactComponent as Icon } from '@/public/static/icons/22px/spinner.svg'

import { withIcon } from './withIcon'

export const IconSpinner22 = withIcon(({ className, ...restProps }) => (
  <Icon className={`u-motion-spin ${className}`} {...restProps} />
))
