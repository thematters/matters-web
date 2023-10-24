import { ReactComponent as Icon } from '@/public/static/icons/16px/spinner.svg'
import { TEST_ID } from '~/common/enums'

import { withIcon } from './withIcon'

export const IconSpinner16 = withIcon(({ className, ...restProps }) => (
  <Icon
    data-test-id={TEST_ID.ICON_SPINNER}
    className={`u-motion-spin ${className}`}
    {...restProps}
  />
))
